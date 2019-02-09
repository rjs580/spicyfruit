import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FullLayoutComponent} from './layouts/full/full-layout.component';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';

import {PRIVATE_ROUTES} from './shared/privateRoutes/contentLayout.routes';
import {PRIVATE_FULL_ROUTES} from './shared/privateRoutes/fullLayout.routes';
import {PUBLIC_ROUTES} from './shared/publicRoutes/contentLayout.routes';
import {PUBLIC_FULL_ROUTES} from './shared/publicRoutes/fullLayout.routes';

import {AuthGuard} from './shared/auth/auth-guard.service';
import {AppPreloadingStrategy} from './appPreloadingStrategy';

const appRoutes: Routes = [
  {path: '', loadChildren: './pages/public-home/public-home.module#PublicHomeModule', data: {preload: true, delay: true}},
  {path: '', component: FullLayoutComponent, data: {title: ''}, children: PRIVATE_FULL_ROUTES, canActivate: [AuthGuard]},
  {path: '', component: ContentLayoutComponent, data: {title: ''}, children: PRIVATE_ROUTES, canActivate: [AuthGuard]},
  {path: '', component: FullLayoutComponent, data: {title: ''}, children: PUBLIC_FULL_ROUTES},
  {path: '', component: ContentLayoutComponent, data: {title: ''}, children: PUBLIC_ROUTES},
  {path: '**', loadChildren: './pages/page-not-found/page-not-found.module#PageNotFoundModule', data: {preload: true, delay: true, title: 'Page Not Found'}},
];

@NgModule({
  providers: [AppPreloadingStrategy],
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: AppPreloadingStrategy})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
