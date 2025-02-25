import {
  IconFile,
  IconFileText,
  IconFolder,
  IconCircleX,
  IconStopwatch,
  IconCircle,
  IconCircleCheck,
  IconExclamationCircle
} from '@tabler/icons-react'

// Define statuses with icons
export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: IconExclamationCircle,
  },
  {
    value: 'todo',
    label: 'To Do',
    icon: IconCircle,
  },
  {
    value: 'in_progress',
    label: 'In Progress',
    icon: IconStopwatch,
  },
  {
    value: 'done',
    label: 'Done',
    icon: IconCircleCheck,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: IconCircleX,
  },
]

// Sample file types with icons
export const files = [
  {
    value: 'pdf',
    label: 'PDF File',
    icon: IconFileText,
  },
  {
    value: 'doc',
    label: 'Word Document',
    icon: IconFileText,
  },
  {
    value: 'csv',
    label: 'CSV File',
    icon: IconFile,
  },
  {
    value: 'folder',
    label: 'Folder',
    icon: IconFolder,
  },
]

