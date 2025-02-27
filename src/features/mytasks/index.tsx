import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/mytasks-column'
import { DataTable } from './components/mytasks-table'
import { MyTasksDialogs } from './components/mytasks-dialogs'
import { MyTasksPrimaryButtons } from './components/mytasks-primary-button'
import MyTasksProvider from './context/mytasks-context'
import {mytasks} from './data/mytasks'

export default function MyTasks() {
  return (
    <MyTasksProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>
            Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <MyTasksPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={mytasks} columns={columns} />
        </div>
      </Main>

      <MyTasksDialogs />
    </MyTasksProvider>
  )
}
