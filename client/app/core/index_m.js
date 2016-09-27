import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component_m';
import { MenuTitleComponent } from './components/menu/menu-title.component_m';
import { AppComponent } from './components/app/app.component_m';

export { AppComponent };
export const CORE_PROVIDERS = [LoggedInGuard, LoggedOutGuard];
export const CORE_DECLARATIONS = [AboutComponent, MenuComponent, MenuTitleComponent, AppComponent];
