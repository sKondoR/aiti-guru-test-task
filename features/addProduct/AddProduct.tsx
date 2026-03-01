'use client'

import { observer } from 'mobx-react-lite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { rootStore } from '@/lib/store/rootStore'

const AddProduct: React.FC = observer(() => {
  const { authorizationStore: store } = rootStore
  
  const handleClick = () => {
    store.logout()
  }

  return (
      <button
        type="button"
        onClick={handleClick}
        className="text-sm bg-blue-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
      >
        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />Добавить
      </button>
  )
})

export default AddProduct