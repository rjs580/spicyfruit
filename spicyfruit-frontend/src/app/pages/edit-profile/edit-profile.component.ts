import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {OAuthService} from '../../shared/auth/o-auth.service';
import {User} from '../../shared/models/User.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profilePic: string = null;
  user: User = null;

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.user = OAuthService.getUser();
    this.profilePic = this.user.profilePic === null ? 'assets/img/portrait/avatars/avatar-08.png' : this.user.profilePic;
  }

  onSubmit() {
  }

  onCancel() {
    setTimeout(() => {
      this.location.back();
    }, 400);
  }
}
