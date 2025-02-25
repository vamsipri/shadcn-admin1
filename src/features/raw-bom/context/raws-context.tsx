import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Raw } from '../data/schema'

type RawsDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface RawsContextType {
  open: RawsDialogType | null
  setOpen: (str: RawsDialogType | null) => void
  currentRow: Raw | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Raw | null>>
}

const RawsContext = React.createContext<RawsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function RawsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<RawsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Raw | null>(null)

  return (
    <RawsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </RawsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRaws = () => {
  const rawsContext = React.useContext(RawsContext)

  if (!rawsContext) {
    throw new Error('useUsers has to be used within <UsersContext>')
  }

  return rawsContext
}
