import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import {MyTasks } from '../data/schema'

type MyTasksDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface MyTasksContextType {
  open: MyTasksDialogType | null
  setOpen: (str: MyTasksDialogType | null) => void
  currentRow: MyTasks | null
  setCurrentRow: React.Dispatch<React.SetStateAction<MyTasks | null>>
}

const MyTasksContext = React.createContext<MyTasksContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function RawsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<MyTasksDialogType>(null)
  const [currentRow, setCurrentRow] = useState<MyTasks | null>(null)

  return (
    <MyTasksContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </MyTasksContext>
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
