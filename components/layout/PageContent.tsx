'use client'

import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useMobxStore } from '@/lib/store/rootStore'
import { NavigationPanel } from './NavigationPanel'
import { Panel } from '../Panel'
import { ProductsTable } from '../products/ProductsTable'

export default observer(
function PageContent() {
  return (<>
      <NavigationPanel title="Товары" />
      <Panel>
        <ProductsTable />
      </Panel>
    </>
  )
})