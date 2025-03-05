import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MyTaskDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: { task_id: number; task_title: string };
  onDelete: () => Promise<void>;
  isDeleting: boolean;  // Accept isDeleting as a prop
}

export const MyTaskDeleteDialog: React.FC<MyTaskDeleteDialogProps> = ({
  open,
  onOpenChange,
  task,
  onDelete,
  isDeleting,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the task <strong>{task.task_title}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onOpenChange.bind(null, false)} variant="secondary" disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={onDelete} variant="destructive" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
