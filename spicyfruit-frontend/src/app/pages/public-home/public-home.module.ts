import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicHomeRoutingModule } from './public-home-routing.module';
import { PublicHomeComponent } from './public-home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {MatchHeightModule} from '../../shared/directives/match-height.directive';

@NgModule({
  imports: [
    CommonModule,
    PublicHomeRoutingModule,
    NgbModule,
    TranslateModule,
    MatchHeightModule
  ],
  declarations: [PublicHomeComponent]
})
export class PublicHomeModule { }
