import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthUser, UserType} from '../../../shared/models/AuthUser.model';
import {OAuthService} from '../../../shared/auth/o-auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassModel = new AuthUser(UserType.ForgotPassword);

  constructor(public translate: TranslateService, private oAuthService: OAuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.oAuthService.resetPasswordForUser(this.forgotPassModel);
  }
}
