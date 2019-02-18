import {Component, AfterViewChecked, AfterContentChecked} from '@angular/core';
import {OAuthService} from '../auth/o-auth.service';
import {User} from '../models/User.model';
import {DomSanitizer, SafeUrl, Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements AfterViewChecked, AfterContentChecked {
  documentTitle: string;
  profilePic: any = null;
  user: User = null;
  placement = 'bottom-right';
  public isCollapsed = true;

  constructor(private oAuthService: OAuthService, private titleService: Title, public translate: TranslateService) {
    this.user = OAuthService.getUser();
    this.profilePic = this.user.profilePic;
  }

  ngAfterContentChecked() {
    this.documentTitle = this.titleService.getTitle();
    this.user = OAuthService.getUser();
    this.profilePic = this.user.profilePic;
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

  verifyAccount() {
    this.oAuthService.verifyAccount();
  }

  signOut() {
    this.oAuthService.signOut();
  }
}
