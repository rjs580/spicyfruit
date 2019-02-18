import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {OAuthService} from '../../shared/auth/o-auth.service';
import {User} from '../../shared/models/User.model';
import {EditUserProfile} from '../../shared/models/EditProfile.model';
import {SweetAlert} from '../../shared/services/sweetalert.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfile: EditUserProfile;
  profilePic: any = null;
  user: User = null;

  constructor(private location: Location, private oauthService: OAuthService) {
    this.editProfile = new EditUserProfile();
  }

  ngOnInit() {
    this.user = OAuthService.getUser();
    this.profilePic = this.user.profilePic;
  }

  onSubmit() {
    this.editProfile.profilePic = (<HTMLInputElement> document.getElementById('picInput')).files[0];
    if(this.editProfile.profilePic.size > 1048576) {
      SweetAlert.errorAlert("File size is too big, it needs to be less than 1mb");
    } else {
      this.oauthService.editProfile(this.editProfile);
    }
  }

  onCancel() {
    setTimeout(() => {
      this.location.back();
    }, 400);
  }
}
