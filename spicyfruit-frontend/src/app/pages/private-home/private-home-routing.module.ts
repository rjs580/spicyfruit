import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivateHomeComponent} from './private-home.component';

const routes: Routes = [{
  path: '',
  component: PrivateHomeComponent,
  data: {title: 'Home'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateHomeRoutingModule { }
