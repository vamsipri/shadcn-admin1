'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { toast } from '@/hooks/use-toast'
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
    task_title:z.string().min(1,{message:"Title is required"}),
    created_date: z.string().min(1, { message: 'Date is required.' }),
    plan_start_date: z.string().min(1, { message: 'Date is required.' }),
    plan_end_date:z.string().min(1, { message: 'Date is required.' }),
    actual_start_date:z.string().min(1, { message: 'Date is required.' }),
    actual_end_date:z.string().min(1, { message: 'Date is required.' }),
    status:z.string().min(1,{message:"status is required"}),
    plan_name:z.string().min(1,{message:"Nme is required"}),
    plan_phase_name:z.string().min(1,{message:"Phase Name is required"}),
  
})
.refine((data) => new Date(data.plan_start_date) <= new Date(data.plan_end_date), {
  message: 'Plan End Date must be after or equal to Plan Start Date.',
  path: ['plan_end_date'],
})
.refine((data) => new Date(data.actual_start_date) <= new Date(data.actual_end_date), {
  message: 'Actual End Date must be after or equal to Actual Start Date.',
  path: ['actual_end_date'],
});


type MyTasksForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MyTasksActionDialog({ open, onOpenChange }: Props) {
  
  
  
  const form = useForm<MyTasksForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task_title:'',
        created_date:'',
        plan_start_date: '',
        plan_end_date:'',
        actual_start_date:'',
        actual_end_date:'',
        status:'',
        plan_name:'',
        plan_phase_name:'',
    },
  })
   // const onSubmit = (values: MyTasksForm) => {
  //   form.reset()
  //   toast({
  //     title: 'Submitted values:',
  //     description: (
  //       <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
  //         <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
  //       </pre>
  //     ),
  //   })
  //   onOpenChange(false)
  // }
  const onSubmit = async (values: MyTasksForm) => {
      
   
      try {
        console.log("Sending request with values:", values);
    
        const response = await fetch("https://amogademo-postgrest.morr.biz/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.Ks_9ISeorCCS73q1WKEjZHu9kRx107eOx5VcImPh9U8`,
            "Prefer": "return=representation",
          },
          body: JSON.stringify(values),
        });
    
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
    
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;
    
        console.log("Response received:", data);
        form.reset();
        onOpenChange(false); // Close the dialog after success
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    
  
  
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>Add New Tasks</DialogTitle>
          <DialogDescription>Fill in the details and click save.</DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[26.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form id='raws-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-0.5'>
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
      <FormItem className="space-y-1 text-sm w-36"> {/* Set width to keep it compact */}
        <FormLabel className="text-xs">Create Date</FormLabel>
        <FormControl>
          <Input type="date" {...field} className="h-8 px-2 text-sm w-full" />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
  <div className="flex gap-4"> {/* Flex container for side-by-side layout */}
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
               <FormItem className="space-y-1 text-sm"> {/* Reduce spacing & text size */}
             <FormLabel className="text-xs">End Date</FormLabel> {/* Smaller label */}
               <FormControl>
                <Input 
                  type="date" 
             {...field} 
          className="h-8 px-2 text-sm w-22" // Smaller height, padding, and width
        />
      </FormControl>
      <FormMessage className="text-xs" /> {/* Smaller error message */}
    </FormItem>
  )}
/>
</div>
          
<div className="flex gap-4"> {/* Flex container for side-by-side layout */}
  <FormField
    control={form.control}
    name="actual_start_date"
    render={({ field }) => (
      <FormItem className="space-y-1 text-sm w-36">
        <FormLabel className="text-xs">ActualStarDate</FormLabel>
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
               <FormItem className="space-y-1 text-sm"> {/* Reduce spacing & text size */}
             <FormLabel className="text-xs">ActualEnd Date</FormLabel> {/* Smaller label */}
               <FormControl>
                <Input 
                  type="date" 
             {...field} 
          className="h-8 px-2 text-sm w-22" // Smaller height, padding, and width
        />
      </FormControl>
      <FormMessage className="text-xs" /> {/* Smaller error message */}
    </FormItem>
  )}
/>
</div>
<FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className="space-y-1 text-sm">
                    <FormLabel className="text-xs">
                     Status
                    </FormLabel>
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
                    <FormLabel>PlanName</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter PlanName' {...field} />
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
                    <FormLabel>PhaseName</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Phasename' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='raws-form'>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
