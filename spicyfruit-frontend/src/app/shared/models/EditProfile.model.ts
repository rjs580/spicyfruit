import {OAuthService} from '../auth/o-auth.service';

export class EditUserProfile {
  profilePic: File;
  nickName: string;

  constructor() {
  }

  toJSON():string {
    let user: any = {};
    user.profilePic = this.profilePic;
    user.nickName = this.nickName;
    user.userEmail = OAuthService.getUser().userEmail;
    user.userID = OAuthService.getUser().userID;

    return JSON.stringify(user);
  }
}
