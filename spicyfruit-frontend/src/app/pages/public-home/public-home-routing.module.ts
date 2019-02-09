import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublicHomeComponent} from './public-home.component';

const routes: Routes = [{
  path: '',
  component: PublicHomeComponent,
  data: {title: 'Spicy Fruit'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicHomeRoutingModule { }
