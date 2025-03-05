

'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SelectDropdown } from '@/components/select-dropdown'
import { myTasksTypes } from '../data/data'

const formSchema = z.object({
  task_id: z.number().optional(),
  task_title: z.string().min(1, { message: 'Title is required' }),
  created_date: z.string().min(1, { message: 'Date is required.' }),
  plan_start_date: z.string().min(1, { message: 'Date is required.' }),
  plan_end_date: z.string().min(1, { message: 'Date is required.' }),
  actual_start_date: z.string().min(1, { message: 'Date is required.' }),
  actual_end_date: z.string().min(1, { message: 'Date is required.' }),
  status: z.string().min(1, { message: 'Status is required' }),
  plan_name: z.string().min(1, { message: 'Name is required' }),
  plan_phase_name: z.string().min(1, { message: 'Phase Name is required' }),
})
.refine((data) => new Date(data.plan_start_date) <= new Date(data.plan_end_date), {
  message: 'Plan End Date must be after or equal to Plan Start Date.',
  path: ['plan_end_date'],
})
.refine((data) => new Date(data.actual_start_date) <= new Date(data.actual_end_date), {
  message: 'Actual End Date must be after or equal to Actual Start Date.',
  path: ['actual_end_date'],
})

type MyTasksForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  fetchTasks: () => void
  initialData?: Partial<MyTasksForm>
  mode: 'add' | 'edit'
  authToken: string
}

export function MyTasksActionDialog({ 
  open, 
  onOpenChange, 
  fetchTasks, 
  initialData, 
  mode,
}: Props) {
  // Create a memoized initial values object to prevent unnecessary re-renders
  const formatDate = (date?: string) => {
    if (!date) return '';
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Extract YYYY-MM-DD
    return formattedDate;
  };
  
  const defaultValues = useMemo(() => ({
    task_id: mode === 'edit' ? initialData?.task_id : undefined,
    task_title: initialData?.task_title || '',
    created_date: formatDate(initialData?.created_date),
    plan_start_date: formatDate(initialData?.plan_start_date),
    plan_end_date: formatDate(initialData?.plan_end_date),
    actual_start_date: formatDate(initialData?.actual_start_date),
    actual_end_date: formatDate(initialData?.actual_end_date),
    status: initialData?.status || '',
    plan_name: initialData?.plan_name || '',
    plan_phase_name: initialData?.plan_phase_name || '',
  }), [mode, initialData]);
  
  const form = useForm<MyTasksForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Modify useEffect to handle form reset
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      form.reset(defaultValues, { 
        keepDefaultValues: true 
      });
    }
  }, [mode, initialData, defaultValues]);

  
  const onSubmit = async (values: MyTasksForm) => {
    try {
      // More robust task_id validation
      if (mode === 'edit' && (!values.task_id || values.task_id <= 0)) {
        console.error("Valid Task ID is required for updating a task");
        return;
      }
  
      // Use the correct column name (task_id instead of id)
      const url = mode === 'add' 
        ? "https://amogademo-postgrest.morr.biz/task" 
        : `https://amogademo-postgrest.morr.biz/task?task_id=eq.${encodeURIComponent(values.task_id??'')}`;
  
      const method = mode === 'add' ? 'POST' : 'PATCH';
  
      console.log("Submitting values:", values);
      console.log("Request URL:", url);
  
      // Use environment variable or hardcoded token
      const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.Ks_9ISeorCCS73q1WKEjZHu9kRx107eOx5VcImPh9U8";
  
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
        "Prefer": "return=representation",
      };
  
      // Prepare the payload (exclude task_id from the payload for PATCH requests)
      const payload = {
        task_title: values.task_title,
        plan_start_date:values.plan_start_date,
        plan_end_date:values.plan_end_date,
        actual_start_date:values.actual_start_date,
        actual_end_date:values.actual_end_date,
        status: values.status,
        created_date: values.created_date,
        plan_name: values.plan_name,
        plan_phase_name: values.plan_phase_name,
        // Add other fields as needed
      };
  
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error details:", errorText); // Log the full error response
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
  
      const text = await response.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (error) {
        console.error("Failed to parse response as JSON:", text);
        throw new Error("Invalid JSON response from server");
      }
  
      console.log("Response received:", data);
  
      if (response.ok) {
        form.reset();
        fetchTasks();
        onOpenChange(false); // Close the dialog after success
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // Optionally, display an error message to the user
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{mode === 'add' ? 'Add New Task' : 'Edit Task'}</DialogTitle>
          <DialogDescription>Fill in the details and click save.</DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[26.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form id='task-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-0.5'>
              <FormField
                control={form.control}
                name='task_title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="created_date"
                render={({ field }) => (
                  <FormItem className="space-y-1 text-sm w-36">
                    <FormLabel className="text-xs">Create Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="h-8 px-2 text-sm w-full" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="plan_start_date"
                  render={({ field }) => (
                    <FormItem className="space-y-1 text-sm w-36">
                      <FormLabel className="text-xs">Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-8 px-2 text-sm w-full" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plan_end_date"
                  render={({ field }) => (
                    <FormItem className="space-y-1 text-sm">
                      <FormLabel className="text-xs">End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-8 px-2 text-sm w-22" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="actual_start_date"
                  render={({ field }) => (
                    <FormItem className="space-y-1 text-sm w-36">
                      <FormLabel className="text-xs">Actual Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-8 px-2 text-sm w-full" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="actual_end_date"
                  render={({ field }) => (
                    <FormItem className="space-y-1 text-sm">
                      <FormLabel className="text-xs">Actual End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-8 px-2 text-sm w-22" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className="space-y-1 text-sm">
                    <FormLabel className="text-xs">Status</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a Status'
                      className='col-span-4'
                      items={myTasksTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='plan_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Plan Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='plan_phase_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phase Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Phase Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='task-form'>
            {mode === 'add' ? 'Save' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MyTasksActionDialog