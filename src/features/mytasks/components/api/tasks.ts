import { myTasks } from "../../data/schema";

export const updateTask = async (taskId: number, updatedData: Partial<myTasks>) => {
    try {
      const response = await fetch(`https://amogademo-postgrest.morr.biz/task?id=eq.${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_TOKEN_HERE`, 
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.status}`);
      }
  
      const updatedTask = await response.json();
      console.log('Task updated successfully:', updatedTask);
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  