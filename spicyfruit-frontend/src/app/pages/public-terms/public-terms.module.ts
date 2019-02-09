import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicTermsRoutingModule } from './public-terms-routing.module';
import { PublicTermsComponent } from './public-terms.component';

@NgModule({
  imports: [
    CommonModule,
    PublicTermsRoutingModule
  ],
  declarations: [PublicTermsComponent]
})
export class PublicTermsModule { }
