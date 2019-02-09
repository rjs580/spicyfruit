import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule} from '@angular/forms';
import {SignInComponent} from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {TranslateModule} from '@ngx-translate/core';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [SignInComponent, ForgotPasswordComponent, SignUpComponent]
})
export class AuthModule {
}
