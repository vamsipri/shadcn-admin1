import { createFileRoute } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/')({
  component: SignIn,
})
// import { createFileRoute } from '@tanstack/react-router'
// import Dashboard from '@/features/dashboard'

// export const Route = createFileRoute('/')({
//   component: Dashboard,
// })
