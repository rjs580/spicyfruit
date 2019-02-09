export enum RouteType {All = 0, Developer = 1, Moderator = 2}

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  badge: string;
  badgeClass: string;
  isExternalLink: boolean;
  routeType: RouteType;
  submenu: RouteInfo[];
}
