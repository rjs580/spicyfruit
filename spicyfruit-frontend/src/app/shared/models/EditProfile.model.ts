import {OAuthService} from '../auth/o-auth.service';

export class EditUserProfile {
  throwAway: any;
  profilePic: File;
  nickName: string;

  constructor() {
  }

  toFormData():FormData {
    let user: any = {};
    user.nickName = this.nickName;
    user.userEmail = OAuthService.getUser().userEmail;
    user.userID = OAuthService.getUser().userID;

    let formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('profilePic', this.profilePic);

    return formData;
  }
}
