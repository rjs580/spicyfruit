import {RouteInfo, RouteType} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/pHome',
    title: 'Home',
    icon: 'ft-home',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    routeType: RouteType.All,
    submenu: []
  },
  {
    path: '',
    title: 'Developer',
    icon: 'fa fa-terminal',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    routeType: RouteType.Developer,
    submenu: [
      {path: 'javascript:;', title: 'Packages', icon: 'ft-package', class: '', badge: '', badgeClass: '', isExternalLink: false, routeType: RouteType.Developer, submenu: []},
      {path: 'javascript:;', title: 'Upload Package', icon: 'ft-upload', class: '', badge: '', badgeClass: '', isExternalLink: false, routeType: RouteType.Developer, submenu: []},
      {path: 'javascript:;', title: 'Pending Review', icon: 'ft-clock', class: '', badge: '', badgeClass: '', isExternalLink: false, routeType: RouteType.Developer, submenu: []}
    ]
  },
  {
    path: '',
    title: 'Moderator',
    icon: 'fa fa-coffee',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    routeType: RouteType.Moderator,
    submenu: [
      {path: 'javascript:;', title: 'Review Packages', icon: 'ft-pocket', class: '', badge: '', badgeClass: '', isExternalLink: false, routeType: RouteType.Moderator, submenu: []},
    ]
  },
  {
    path: '/pTerms',
    title: 'Terms & Conditions',
    icon: 'ft-file-text',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    routeType: RouteType.All,
    submenu: []
  }
];
