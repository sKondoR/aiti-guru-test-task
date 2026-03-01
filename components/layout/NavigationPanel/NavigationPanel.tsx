import { observer } from 'mobx-react-lite'

import { SearchForm } from '../SearchForm'

import { User } from '@/components/User'

export default observer(
function NavigationPanel({ title = '' }: { title?: string }) {

  return (<nav className="bg-white p-[30px] flex flex-row align-middle mb-10">
    <h3 className="text-2xl flex-1 mr-5">{title}</h3>
    <SearchForm />
    <div className="flex-1 ml-5">
      <User />
    </div>
  </nav>
  )
})