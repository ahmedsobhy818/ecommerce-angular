import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { VendorComponent } from './vendor.component';

const routes: Routes = [
  {path:'' , component: VendorComponent}
  ,{path:'**' , component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VENDORRoutingModule { }
