import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthUser, UserType} from '../../../shared/models/AuthUser.model';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import {OAuthService} from '../../../shared/auth/o-auth.service';
import {SweetAlert} from '../../../shared/services/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInModel = new AuthUser();
  passwordPattern = '^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$';

  constructor(public translate: TranslateService, private authService: AuthService, private oAuthService: OAuthService) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.signInModel.userType = UserType.Regular;
    this.signIn();
  }

  signIn(): void {
    SweetAlert.close();
    this.oAuthService.signInUser(this.signInModel);
  }

  signInWithGoogle(): void {
    SweetAlert.loadingAlert();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      if (user !== null) {
        this.signInModel.id = user.id;
        this.signInModel.idToken = user.idToken;
        this.signInModel.userEmail = user.email;
        this.signInModel.userType = UserType.SocialUser;
        this.signOut();
        this.signIn();
      }
    }).catch((err) => {
      SweetAlert.errorAlert(err);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
