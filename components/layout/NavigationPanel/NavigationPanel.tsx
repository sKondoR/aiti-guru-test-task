import { SearchForm } from '../SearchForm'

import { User } from '@/components/User'

interface NavigationPanelProps {
  title?: string
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ title = '' }) => {
  return (<nav className="bg-white p-[30px] flex flex-row align-middle mb-10">
    <h3 className="text-2xl flex-1 mr-5">{title}</h3>
    <SearchForm />
    <div className="flex-1 ml-5">
      <User />
    </div>
  </nav>
  )
}

export default NavigationPanel