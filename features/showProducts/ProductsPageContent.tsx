import { ProductsTable } from './ProductsTable'
import { NavigationPanel } from '../layout/NavigationPanel'

import { Panel } from '@/shared/ui/Panel'

const ProductsPageContent: React.FC = () => {
  return (<>
      <NavigationPanel title="Товары" />
      <Panel>
        <ProductsTable />
      </Panel>
    </>
  )
}

export default ProductsPageContent