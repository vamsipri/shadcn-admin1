// import { z } from 'zod';

// // Define the status schema
// const MyTasksStatusSchema = z.union([
//   z.literal('active'),
//   z.literal('inactive'),
// ]);

// // Export type for status
// export type MyTasksStatus = z.infer<typeof MyTasksStatusSchema>;

// // Define the main task schema
// const MyTasksSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   status: MyTasksStatusSchema, // Ensure this is included
//   createDate: z.string(),
//   startDate: z.string(),
//   endDate: z.string(),
//   actualStartDate: z.string(),
//   actualEndDate: z.string(),
//   planName: z.string(),
//   phaseName: z.string(),
//   priority: z.string(), // Fix incorrect type
//   actions: z.string(),
// });

// // Export type for single task
// export type MyTasks = z.infer<typeof MyTasksSchema>;


export interface myTasks {
  id:number
  task_title:string
   status: string // Ensure this is included
   created_date:string
  //  startDate: string,
  //  endDate:string,
  //  actualStartDate:string
  //  actualEndDate: string
   plan_name: string
   plan_phase_name: string
  actions?: string
   
}
