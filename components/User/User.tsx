'use client'

import { observer } from 'mobx-react-lite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { rootStore } from '@/lib/store/rootStore'

const User: React.FC = observer(() => {
  const { authorizationStore: store } = rootStore

  if (!store.user) return null

  console.log('store', store);
  const handleLogout = () => {
    store.logout()
  }

  return (
      <div>
        {store.user.username}
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-gray-500 hover:text-[var(--color-primary)] disabled:opacity-30 disabled:hover:text-gray-500 cursor-pointer"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
      </div>    
  )
})

export default User