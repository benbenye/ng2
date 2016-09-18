/**
 * Created by bby on 16/8/23.
 */
import { CategoryListService } from './services/category-list.service';

import { CategoryListComponent } from './components/category-list.component_m'

export {CategoryListService}

export const CATEGORYLSIT_PROVIDERS = [CategoryListService];
export const CATEGORYLIST_DECLARATIONS = [
  CategoryListComponent,
];
