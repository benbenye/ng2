import { IndexService } from './services/index/index.service_m';

import { IndexComponent } from './components/index-index/index-index.component_m'
import { IndexLcListComponent } from './components/index-lc-list/index-lc-list.component_m'

export {IndexService}

export const INDEX_PROVIDERS = [IndexService];
export const INDEX_DECLARATIONS = [
  IndexComponent,
  IndexLcListComponent,
];
