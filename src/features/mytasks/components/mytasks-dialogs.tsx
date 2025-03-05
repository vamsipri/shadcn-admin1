
// export default MyTasksDialogs;
import { useState } from 'react';
import { useMyTasks } from '../context/mytasks-context'; 
import { MyTasksActionDialog } from './mytasks-action-dialog'; 
import { MyTaskDeleteDialog } from './mytasks-delete-dialog'; 

interface MyTasksDialogsProps {
  fetchTasks: () => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
  authToken: string;
}

export const MyTasksDialogs: React.FC<MyTasksDialogsProps> = ({ 
  fetchTasks, 
  onDelete, 
  authToken 
}) => {
  const { open, setOpen, currentRow, setCurrentRow } = useMyTasks();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDialogClose = () => {
    setTimeout(() => {
      setCurrentRow(null);
    }, 300);
  };

  const handleDelete = async () => {
    if (!currentRow) return;

    setIsDeleting(true);
    try {
      await onDelete(currentRow.task_id);
      setOpen(null);
      handleDialogClose();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Dialog for adding a new task */}
      <MyTasksActionDialog
        key="task-add"
        open={open === 'add'}
        onOpenChange={(state) => {
          setOpen(state ? 'add' : null);
          if (!state) handleDialogClose();
        }}
        fetchTasks={fetchTasks}
        authToken={authToken}
        mode="add"
      />

      {/* Dialogs for editing or deleting a task */}
      {currentRow && (
        <>
          {/* Dialog for editing an existing task */}
          <MyTasksActionDialog
            key={`task-edit-${currentRow.task_id}`}
            open={open === 'edit'}
            onOpenChange={(state) => {
              setOpen(state ? 'edit' : null);
              if (!state) handleDialogClose();
            }}
            fetchTasks={fetchTasks}
            initialData={{
              task_id: currentRow.task_id,
              task_title: currentRow.task_title,
              status: currentRow.status,
              created_date: currentRow.created_date,
              plan_start_date: currentRow.plan_start_date,
              plan_end_date: currentRow.plan_end_date,
              actual_start_date: currentRow.actual_start_date,
              actual_end_date: currentRow.actual_end_date,
              plan_name: currentRow.plan_name,
              plan_phase_name: currentRow.plan_phase_name,
            }}
            authToken={authToken}
            mode="edit"
          />

          {/* Dialog for deleting a task */}
          <MyTaskDeleteDialog
            key={`task-delete-${currentRow.task_id}`}
            open={open === 'delete'}
            onOpenChange={(state) => {
              setOpen(state ? 'delete' : null);
              if (!state) handleDialogClose();
            }}
            task={currentRow}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </>
      )}
    </>
  );
};

export default MyTasksDialogs;