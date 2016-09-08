import { IndexService } from './services/index/index.service';

import { IndexComponent } from './components/index-index/index-index.component'
import { IndexLcListComponent } from './components/index-lc-list/index-lc-list.component'

export {IndexService}

export const INDEX_PROVIDERS = [IndexService];
export const INDEX_DECLARATIONS = [
  IndexComponent,
  IndexLcListComponent,
];
