import { provideRouter } from '@angular/router';

import { PostListComponent } from '../posts/components/post-list/post-list.component';
import { PostNewComponent } from '../posts/components/post-new/post-new.component';
import { PostEditComponent } from '../posts/components/post-edit/post-edit.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

import { IndexComponent } from '../index/components/index-index/index-index.component_m';
import { OrderComponent } from '../order/components/order-component_m';
import { AddressManageComponent } from '../user/components/address-manage/address-manage.component';
import { CpsLoginRegComponent } from '../topic/components/cps/cps-login-reg.component';

export const routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'order', component: OrderComponent, pathMatch: 'full' },
  { path: 'topic/cps', component: CpsLoginRegComponent, pathMatch: 'full'},
  { path: 'address', component: AddressManageComponent, pathMatch: 'full' },
  // { path: 'address', components: AddressManageComponent, terminal: true },
  { path: 'new', component: PostNewComponent, canActivate: [LoggedInGuard] },
  { path: 'edit/:id', component: PostEditComponent, canActivate: [LoggedInGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] }
];

// export const APP_ROUTES_PROVIDER = provideRouter(routes);
