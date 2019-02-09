import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateHomeRoutingModule } from './private-home-routing.module';
import { PrivateHomeComponent } from './private-home.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    PrivateHomeRoutingModule,
    TranslateModule,
    NgbModule
  ],
  declarations: [PrivateHomeComponent]
})
export class PrivateHomeModule { }
