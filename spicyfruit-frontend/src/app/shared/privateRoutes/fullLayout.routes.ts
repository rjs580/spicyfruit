import {Routes} from '@angular/router';

// content paths with any navbar, footer, or sidebar
export const PRIVATE_FULL_ROUTES: Routes = [{
  path: 'pHome',
  loadChildren: './pages/private-home/private-home.module#PrivateHomeModule',
  data: {preload: true, delay: true}
}];
