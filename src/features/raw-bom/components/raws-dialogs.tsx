import { useRaws } from '../context/raws-context'
import { RawsActionDialog } from './raws-action-dialog'
// import { UsersDeleteDialog } from './users-delete-dialog'
// import { UsersInviteDialog } from './users-invite-dialog'

export function RawDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRaws()
  return (
    <>
      <RawsActionDialog
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
          <RawsActionDialog
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
