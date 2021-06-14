import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AdministratorComponent } from './administrator.component';
import { OperatorComponent } from './operator/operator.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  { path:'' , component:AdministratorComponent ,children:[
    {path:'Admin' ,  loadChildren:()=>import('./admin/admin.module').then(m=>m.ADMINModule)},
    {path: 'Vendor' , component:VendorComponent},
    {path:'Operator' , component:OperatorComponent}
      
  ]
}
,{path:'**' , component:NotFoundComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
