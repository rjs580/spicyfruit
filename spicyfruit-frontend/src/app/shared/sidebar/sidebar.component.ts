import {Component, OnInit} from '@angular/core';
import {ROUTES} from './sidebar-routes.config';
import {RouteType} from './sidebar.metadata';
import {OAuthService} from '../auth/o-auth.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];

  constructor() {
  }

  ngOnInit() {
    $.getScript('./assets/js/app-sidebar.js');
    this.menuItems = ROUTES.filter(menuItem => {
      return SidebarComponent.routeFilter(menuItem);
    });
  }

  static routeFilter(route) {
    if(route.routeType === RouteType.Developer) {
      return OAuthService.getUser().isDeveloper;
    }

    if(route.routeType === RouteType.Moderator) {
      return OAuthService.getUser().isModerator;
    }

    return true;
  }
}
