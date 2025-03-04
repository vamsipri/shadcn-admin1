import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface MyTaskDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void; // ✅ Ensure boolean type
  currentRow: { id: number } | null; // ✅ Receive selected task
  // onDelete: (id: number) => void; // ✅ Function to delete task
}

export function MyTaskDeleteDialog({ open, onOpenChange, currentRow}: MyTaskDeleteDialogProps) {
    console.log("Rendering MyTaskDeleteDialog, currentRow:", currentRow);
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
              {currentRow ? `Are you sure you want to delete task ID: ${currentRow.id}?` : "No task selected."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              if (!currentRow || !currentRow.id) {
                console.error("Error: currentRow is undefined or missing ID");
                return;
              }
              console.log("Deleting task with ID:", currentRow.id);
              // onDelete(currentRow.id);
            }}
          >
            Yes, Delete
          </Button>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
