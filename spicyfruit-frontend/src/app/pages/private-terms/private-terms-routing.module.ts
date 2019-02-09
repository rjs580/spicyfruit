import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivateTermsComponent} from './private-terms.component';

const routes: Routes = [{
  path: '',
  component: PrivateTermsComponent,
  data: {title: 'Terms & Conditions'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateTermsRoutingModule { }
