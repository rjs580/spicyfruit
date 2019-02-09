import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  }, {
    path: 'sign-in',
    component: SignInComponent,
    data: {title: 'Spicy Fruit - Sign In'}
  }, {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {title: 'Spicy Fruit - Forgot Password'}
  }, {
    path: 'sign-up',
    component: SignUpComponent,
    data: {title: 'Spicy Fruit - Sign Up'}
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
