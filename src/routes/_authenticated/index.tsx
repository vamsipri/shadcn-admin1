// import { createFileRoute } from '@tanstack/react-router'
// import Dashboard from '@/features/dashboard'

// export const Route = createFileRoute('/_authenticated/')({
//   component: Dashboard,
// })
import { createFileRoute } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'

export const Route = createFileRoute('/_authenticated/')({
  component: SignIn,
})
