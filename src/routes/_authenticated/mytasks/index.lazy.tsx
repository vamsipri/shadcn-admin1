import MyTasks from '@/features/mytasks'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/mytasks/')({
  component: MyTasks,
})

