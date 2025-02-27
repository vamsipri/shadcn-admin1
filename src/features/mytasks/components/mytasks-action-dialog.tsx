'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
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
    createDate: z.string().min(1, { message: 'Date is required.' }),
    startDate: z.string().min(1, { message: 'Date is required.' }),
    endDate:z.string().min(1, { message: 'Date is required.' }),
    actualStartDate:z.string().min(1, { message: 'Date is required.' }),
    actualEndDate:z.string().min(1, { message: 'Date is required.' }),
    status:z.string().min(1,{message:"status is required"}),
    planName:z.string().optional(),
    phaseName:z.string().optional(),
  
})

type MyTasksForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MyTasksActionDialog({ open, onOpenChange }: Props) {
  const form = useForm<MyTasksForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        createDate:'',
        startDate: '',
        endDate:'',
        actualStartDate:'',
        actualEndDate:'',
        status:'',
        planName:'',
        phaseName:'',
    },
  })

  const onSubmit = (values: MyTasksForm) => {
    form.reset()
    toast({
      title: 'Submitted values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

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
    name="createDate"
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
    name="startDate"
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
               name="endDate"
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
    name="actualStartDate"
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
               name="actualEndDate"
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
                name='planName'
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
                name='phaseName'
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
