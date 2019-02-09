import {Component, OnInit} from '@angular/core';
import {OAuthService} from '../../shared/auth/o-auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-private-home',
  templateUrl: './private-home.component.html',
  styleUrls: ['./private-home.component.scss']
})
export class PrivateHomeComponent implements OnInit {
  nickName: string;
  lastLogin: Date;

  constructor(public translate: TranslateService) {
    this.nickName = OAuthService.getUser().nickName;
    this.lastLogin = OAuthService.getUser().lastLogin;
  }

  ngOnInit() {
  }
}
