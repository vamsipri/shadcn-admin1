// import { Header } from '@/components/layout/header'
// import { Main } from '@/components/layout/main'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
// // import {columns} from './components/raws-columns'
// import { RawDialogs } from './components/raws-dialogs'
// import { RawPrimaryButtons } from './components/raws-primary-button'
// //  import { DataTable} from './components/raws-table'
// import RawsProvider from './context/raws-context'
// // import { rawSchema } from './data/schema'
// // import { raws } from './data/raws'

// export default function RawBomFiles() {
//   // Parse user list
//   // const userList = rawSchema.parse(raws)

//   return (
//     <RawsProvider>
//       <Header fixed>
//         <Search />
//         <div className='ml-auto flex items-center space-x-4'>
//           <ThemeSwitch />
//           <ProfileDropdown />
//         </div>
//       </Header>

//       <Main>
//         <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
//           <div>
//             <h2 className='text-2xl font-bold tracking-tight'>Raw BOM Files</h2>
//             <p className='text-muted-foreground'>
//               Here is the list
//             </p>
//           </div>
//           <RawPrimaryButtons />
//         </div>
//         <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          
//         </div>
//       </Main>

//       <RawDialogs />
//     </RawsProvider>
//   )
// }
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/raws-columns'
import { DataTable } from './components/raws-table'
import { RawDialogs } from './components/raws-dialogs'
import { RawPrimaryButtons } from './components/raws-primary-button'
import RawsProvider from './context/raws-context'
import {raws} from './data/raws'

export default function RawBomFiles() {
  return (
    <RawsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Raw BOM Files</h2>
            <p className='text-muted-foreground'>
              Here is the list
            </p>
          </div>
          <RawPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={raws} columns={columns} />
        </div>
      </Main>

      <RawDialogs />
    </RawsProvider>
  )
}
