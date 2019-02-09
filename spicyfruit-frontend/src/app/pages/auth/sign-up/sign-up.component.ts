import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {OAuthService} from '../../../shared/auth/o-auth.service';
import {AuthUser, UserType} from '../../../shared/models/AuthUser.model';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import {SweetAlert} from '../../../shared/services/sweetalert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpModel = new AuthUser();
  passwordPattern = '^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$';
  nickNamePattern = '^.{3,}$';
  confirmPassword = false;

  constructor(public translate: TranslateService, private authService: AuthService, private oAuthService: OAuthService) {
  }

  ngOnInit() {
  }

  checkPassword(password): void {
    this.confirmPassword = password !== this.signUpModel.userPassword;
  }

  onSubmit(): void {
    this.signUpModel.userType = UserType.Regular;
    this.signUp();
  }

  signUpWithGoogle(): void {
    SweetAlert.loadingAlert();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      if (user !== null) {
        this.signUpModel.id = user.id;
        this.signUpModel.idToken = user.idToken;
        this.signUpModel.userEmail = user.email;
        this.signUpModel.userType = UserType.SocialUser;
        this.signUpModel.nickName = user.name;
        this.signOut();
        this.signUp();
      }
    }).catch((err) => {
      SweetAlert.errorAlert(err);
    });
  }

  signUp(): void {
    SweetAlert.close();
    this.oAuthService.signUpUser(this.signUpModel);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
