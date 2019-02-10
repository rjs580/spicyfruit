import {Routes} from '@angular/router';

// content paths with any navbar, footer, or sidebar
export const PRIVATE_FULL_ROUTES: Routes = [{
  path: 'pHome',
  loadChildren: './pages/private-home/private-home.module#PrivateHomeModule',
  data: {preload: true, delay: true}
}, {
  path: 'pTerms',
  loadChildren: './pages/private-terms/private-terms.module#PrivateTermsModule',
  data: {preload: false, delay: false}
}, {
  path: 'editProfile',
  loadChildren: './pages/edit-profile/edit-profile.module#EditProfileModule',
  data: {preload: false, delay: false}
}];
