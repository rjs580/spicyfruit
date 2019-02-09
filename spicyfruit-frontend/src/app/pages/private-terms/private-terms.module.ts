import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateTermsRoutingModule } from './private-terms-routing.module';
import { PrivateTermsComponent } from './private-terms.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateTermsRoutingModule
  ],
  declarations: [PrivateTermsComponent]
})
export class PrivateTermsModule { }
