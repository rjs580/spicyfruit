export enum UserType {SocialUser = 0, Regular = 1, ForgotPassword = 2}

export class AuthUser {
  userEmail: string;
  userPassword: string;
  idToken: string;
  id: string;
  userType: UserType;
  nickName: string;

  constructor(userT?: UserType) {
    if(userT) this.userType = userT;
  }

  toJSON():string {
    let user: any = {};
    user.userType = this.userType;
    user.userEmail = this.userEmail;
    user.nickName = this.nickName;

    if(this.userType == UserType.Regular) {
      user.userPassword = this.userPassword;
    }

    if(this.userType == UserType.SocialUser) {
      user.idToken = this.idToken;
      user.id = this.id;
    }

    return JSON.stringify(user);
  }
}
