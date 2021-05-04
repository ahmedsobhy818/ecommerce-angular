import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'', component:DashboardComponent}, //  /admin route
  {path:'dashboard', component:DashboardComponent} //   /admin/dashboard rorute
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
