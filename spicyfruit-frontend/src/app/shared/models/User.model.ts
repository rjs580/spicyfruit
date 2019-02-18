import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export class User {
  nickName: string;
  userEmail: string;
  userID: number;
  profilePic: SafeResourceUrl;
  isVerified: boolean;
  isDeveloper: boolean;
  isModerator: boolean;
  lastLogin: Date;

  constructor() {
  }

  static deserialize(sanitizer: DomSanitizer, json: any): User {
    let msg = Object.create(User.prototype);

    return Object.assign(msg, json, {
      lastLogin: new Date(json.lastLogin + " GMT"),
      profilePic: json.profilePic === null ? 'assets/img/portrait/avatars/avatar-08.png' : sanitizer.bypassSecurityTrustResourceUrl(json.profilePic),
      // to test
      isDeveloper: true,
      isModerator: true
    });
  }
}
