import { z } from 'zod'
const MyTasksStatusSchema = z.union([
    z.literal('active'),
    z.literal('inactive'),
    
  ])
  export type MYTasksStatus = z.infer<typeof MyTasksStatusSchema>
  

const  MyTasksSchema = z.object({
    id: z.string(),
    title:z.string(),
    status: MyTasksStatusSchema,
    createDate:z.string(),
   startDate:z.string(),
   endDate:z.string(),
   actualStartDate:z.string(),
   actualEndDate:z.string(),
   planName:z.string(),
   phaseName:z.string(), 
//    priority: string,
   actions:z.string(),
  })
  export type myTasks = z.infer<typeof MyTasksSchema>
  export const MytaskListSchema = z.array(MyTasksSchema);