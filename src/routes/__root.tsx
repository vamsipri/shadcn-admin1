// import { QueryClient } from '@tanstack/react-query'
// import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import { Toaster } from '@/components/ui/toaster'
// import GeneralError from '@/features/errors/general-error'
// import NotFoundError from '@/features/errors/not-found-error'

// export const Route = createRootRouteWithContext<{
//   queryClient: QueryClient
// }>()({
//   component: () => {
//     return (
//       <>
//         <Outlet />
//         <Toaster />
//         {import.meta.env.MODE === 'development' && (
//           <>
//             <ReactQueryDevtools buttonPosition='bottom-left' />
//             <TanStackRouterDevtools position='bottom-right' />
//           </>
//         )}
//       </>
//     )
//   },
//   notFoundComponent: NotFoundError,
//   errorComponent: GeneralError,
// })
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
  beforeLoad: ({ location }) => {
    // If the user is at the root path, redirect to sign-in
    if (location.pathname === '/') {
      throw redirect({
        to: '/sign-in',
        search: {}, // Added empty search params for type safety
      })
    }
  },
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
      {import.meta.env.MODE === 'development' && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </>
  )
}