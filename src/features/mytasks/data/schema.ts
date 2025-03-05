// import { z } from 'zod';

// // Define the status schema using an enum
// enum TaskStatus {
//   Active = 'active',
//   Inactive = 'inactive',
// }

// const MyTasksStatusSchema = z.nativeEnum(TaskStatus);

// // Define the main task schema
// const MyTasksSchema = z.object({
//   id: z.number().positive(), // Ensure ID is a positive number
//   task_title: z.string().min(1, { message: 'Task title is required' }), // Add validation
//   status: MyTasksStatusSchema,
//   created_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' }), // Validate date format
//   plan_name: z.string().min(1, { message: 'Plan name is required' }), // Add validation
//   plan_phase_name: z.string().min(1, { message: 'Plan phase name is required' }), // Add validation
//   actions: z.string().optional(), // Optional field
//   due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Due date must be in YYYY-MM-DD format' }).optional(), // Optional due date
//   priority: z.number().min(1).max(5).optional(), // Example: Priority from 1 to 5
// });

// // Export type for single task
// export type MyTasks = z.infer<typeof MyTasksSchema>;

// // Example usage
// const task: MyTasks = {
//   id: 1,
//   task_title: 'Complete project',
//   status: TaskStatus.Active,
//   created_date: '2023-10-01',
//   plan_name: 'Q4 Plan',
//   plan_phase_name: 'Execution',
//   actions: 'Review and approve',
//   due_date: '2023-10-15',
//   priority: 3,
// };

// console.log(task);
export interface myTasks {
  task_id:number
  task_title:string
   status: string // Ensure this is included
   created_date:string
   plan_start_date: string,
   plan_end_date:string,
    actual_start_date:string
    actual_end_date: string
   plan_name: string
   plan_phase_name: string
  actions?: string
  // due_date?:string
   
}

// export interface MyTasks {
//   id?: number; // Optional for new tasks
//   task_title: string;
//   description?: string; // Added description field
//   status: string;
//   created_date: string;
//   due_date?: string;
//   plan_name: string;
//   plan_phase_name: string;
//   actions?: string;
// }
