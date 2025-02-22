import { createLazyFileRoute } from '@tanstack/react-router'
import Items from '@/features/items'

export const Route = createLazyFileRoute('/_authenticated/items/')({
  component: Items,
})


