import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Task {
  task_id: number;
  task_title: string;
  status: string;
  created_date?: string;
  plan_start_date?: string;
  plan_end_date?: string;
  actual_start_date?: string;
  actual_end_date?: string;
  plan_name?: string;
  plan_phase_name?: string;
}


interface MyTaskDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onDelete: () => Promise<void>;
}

export function MyTaskDeleteDialog({ 
  open, 
  onOpenChange, 
  // task, 
  onDelete 
}: MyTaskDeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } catch (error) {
      console.error('Error during delete operation:', error);
    } finally {
      setLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task?
          </DialogDescription>
        </DialogHeader>

       
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
  {loading ? 'Deleting...' : 'Delete'}
</Button>

          {/* <Button variant="destructive" onClick={handleDelete} >
            Delete
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}