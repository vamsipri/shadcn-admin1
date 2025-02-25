import RawBomFiles from '@/features/raw-bom'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/raw-bom/')({
  component: RawBomFiles,
})

