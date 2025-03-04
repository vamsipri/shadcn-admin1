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
  export const deleteTask = async (taskId: number) => {
    console.log(`Deleting task with ID: ${taskId}`);
    try {
      const response = await fetch(`https://amogademo-postgrest.morr.biz/task?id=eq.${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.Ks_9ISeorCCS73q1WKEjZHu9kRx107eOx5VcImPh9U8`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete task. Status: ${response.status}`);
      }
  
      console.log("Task deleted successfully!");
      // fetchTasks(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  