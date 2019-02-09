import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublicTermsComponent} from './public-terms.component';

const routes: Routes = [{
  path: '',
  component: PublicTermsComponent,
  data: {title: 'Spicy Fruit - Terms & Conditions'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicTermsRoutingModule { }
