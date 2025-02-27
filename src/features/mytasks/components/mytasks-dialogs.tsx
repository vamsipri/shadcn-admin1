import { useMyTasks } from '../context/mytasks-context'
import { MyTasksActionDialog } from './mytasks-action-dialog'
// import { UsersDeleteDialog } from './users-delete-dialog'
// import { UsersInviteDialog } from './users-invite-dialog'

export function MyTasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useMyTasks()
  return (
    <>
      <MyTasksActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {/* <UsersInviteDialog
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      /> */}

      {currentRow && (
        <>
          <MyTasksActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            // currentRow={currentRow}
          />

          {/* <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          /> */}
        </>
      )}
    </>
  )
}
