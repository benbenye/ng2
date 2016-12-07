/**
 * Created by bby on 16/9/7.
 */
import { CrawlerComponent } from './crawler/components/index.component';
import { IndexService } from './crawler/service/index.service';
export {
  IndexService
}
export const GAME_DECLARATIONS = [
  CrawlerComponent
];

export const GAME_PROVIDERS = [
  IndexService
]