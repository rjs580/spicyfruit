export class User {
  nickName: string;
  userEmail: string;
  userID: number;
  profilePic: string;
  isVerified: boolean;
  isDeveloper: boolean;
  isModerator: boolean;
  lastLogin: Date;

  constructor() {
  }

  static deserialize(json: any): User {
    let msg = Object.create(User.prototype);
    return Object.assign(msg, json, {
      lastLogin: new Date(json.lastLogin)
    });
  }
}
