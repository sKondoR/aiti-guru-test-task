'use client'

import { observer } from 'mobx-react-lite'

import { ProductsTable } from './ProductsTable'
import { NavigationPanel } from '../layout/NavigationPanel'

import { Panel } from '@/shared/ui/Panel'

export default observer(
function ProductsPageContent() {
  return (<>
      <NavigationPanel title="Товары" />
      <Panel>
        <ProductsTable />
      </Panel>
    </>
  )
})