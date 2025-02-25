import RoleMenu from '@/features/rolemenu'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/role-menu/')({
  component: RoleMenu,
})

