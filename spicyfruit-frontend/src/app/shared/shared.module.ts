import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ToggleFullscreenDirective} from './directives/toggle-fullscreen.directive';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    NgbModule,
    TranslateModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    TranslateModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective
  ]
})
export class SharedModule {
}
