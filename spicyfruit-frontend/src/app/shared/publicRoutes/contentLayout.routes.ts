import {Routes} from '@angular/router';

// content paths without any navbar, footer, or sidebar
export const PUBLIC_ROUTES: Routes = [{
  path: 'home',
  loadChildren: './pages/public-home/public-home.module#PublicHomeModule',
  data: {preload: true, delay: true}
}, {
  path: 'auth',
  loadChildren: './pages/auth/auth.module#AuthModule',
  data: {preload: true, delay: true}
}, {
  path: 'terms',
  loadChildren: './pages/public-terms/public-terms.module#PublicTermsModule',
  data: {preload: false, delay: false}
}];
