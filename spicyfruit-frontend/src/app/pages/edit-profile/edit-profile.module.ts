import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditProfileRoutingModule} from './edit-profile-routing.module';
import {EditProfileComponent} from './edit-profile.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    FormsModule,
    TranslateModule,
    NgbModule
  ],
  declarations: [EditProfileComponent]
})
export class EditProfileModule {
}
