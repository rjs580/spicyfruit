import {Component, AfterViewChecked, AfterContentChecked} from '@angular/core';
import {OAuthService} from '../auth/o-auth.service';
import {User} from '../models/User.model';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements AfterViewChecked, AfterContentChecked {
  documentTitle: string;
  profilePic: string = null;
  user: User = null;
  placement = 'bottom-right';
  public isCollapsed = true;

  constructor(private oAuthService: OAuthService, private titleService: Title, public translate: TranslateService) {
    this.user = OAuthService.getUser();
    this.profilePic = this.user.profilePic === null ? 'assets/img/portrait/avatars/avatar-08.png' : this.user.profilePic;
  }

  ngAfterContentChecked() {
    this.documentTitle = this.titleService.getTitle();
    this.user = OAuthService.getUser();
    this.profilePic = this.user.profilePic === null ? 'assets/img/portrait/avatars/avatar-08.png' : this.user.profilePic;
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      let wrapperDiv = document.getElementsByClassName('wrapper')[0];
      let dir = wrapperDiv.getAttribute('dir');
      if (dir === 'rtl') {
        this.placement = 'bottom-left';
      } else if (dir === 'ltr') {
        this.placement = 'bottom-right';
      }
    }, 3000);
  }

  signOut() {
    this.oAuthService.signOut();
  }
}
