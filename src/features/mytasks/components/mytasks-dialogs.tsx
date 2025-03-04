import { useMyTasks } from '../context/mytasks-context'
import { MyTasksActionDialog } from './mytasks-action-dialog'
// import { MyTaskDeleteDialog } from './mytasks-delete-dialog';

// import { UsersInviteDialog } from './users-invite-dialog'
interface MyTasksDialogsProps {
  fetchTasks: () => void;
  // onDelete: (taskId: number) => void; // ✅ Define fetchTasks as a function that returns void
}

export function MyTasksDialogs({ fetchTasks}: MyTasksDialogsProps) {
  const { open, setOpen, currentRow, setCurrentRow } = useMyTasks()
  return (
    <>
      <MyTasksActionDialog
        key="user-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
        fetchTasks={fetchTasks}
      />
  
      {currentRow && (
        <>
          <MyTasksActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            fetchTasks={fetchTasks}
          />
  
          {/* <MyTaskDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === "delete"}
            onOpenChange={() => setOpen(null)} // ✅ Fix type mismatch
            currentRow={currentRow}
            onDelete={(id) => {
              console.log("Delete function called for ID:", id);
              // Call your DELETE API function here
            }}
          /> */}
        </>
      )}
    </>
  ); // ✅ Ensure JSX fragment is properly closed here
  
   
}