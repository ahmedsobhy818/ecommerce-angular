import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AdminComponent } from './admin.component';
import { ManageOperatorsComponent } from './manage-operators/manage-operators.component';
import { ManageVendorsComponent } from './manage-vendors/manage-vendors.component';

const routes: Routes = [
  {path:'' , component:AdminComponent,children:[
    {path:'ManageVendors' , component:ManageVendorsComponent},
    {path: 'ManageOperators',component:ManageOperatorsComponent}

  ]}
  ,{path:'**' , component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ADMINRoutingModule { }
