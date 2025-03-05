import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { myTasks } from '../data/schema'

export type MyTasksDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface MyTasksContextType {
  open: MyTasksDialogType | null
  setOpen: (str: MyTasksDialogType | null) => void
  currentRow: myTasks | null
  setCurrentRow: React.Dispatch<React.SetStateAction<myTasks | null>>
}

const MyTasksContext = React.createContext<MyTasksContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function RawsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<MyTasksDialogType>(null)
  const [currentRow, setCurrentRow] = useState<myTasks | null>(null)

  return (
    <MyTasksContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </MyTasksContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMyTasks = () => {
  const tasksContext = React.useContext(MyTasksContext)

  if (!tasksContext) {
    throw new Error('useUsers has to be used within <UsersContext>')
  }

  return tasksContext
}