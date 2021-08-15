import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdministratorComponent } from './administrator.component';
import { AccountLogComponent } from './components/account-log/account-log.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ManageVendorsComponent } from './components/manage-vendors/manage-vendors.component';
import { MyLogComponent } from './components/my-log/my-log.component';
import { OperatorComponent } from './operator/operator.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  { path:'' , component:AdministratorComponent ,children:[
    {path:'Admin' ,  loadChildren:()=>import('./admin/admin.module').then(m=>m.ADMINModule)},
    {path:'Vendor' ,  loadChildren:()=>import('./vendor/vendor.module').then(m=>m.VENDORModule)},
    //{path: 'Vendor' , component:VendorComponent},
    {path:'Operator' , component:OperatorComponent},
    {path:'Log' , component:MyLogComponent},
    {path:'Password' , component:ChangePasswordComponent},
    {path: 'ManageVendors' , component:ManageVendorsComponent},
    {path: 'AccountLog/:id' , component:AccountLogComponent},
    {path: 'Notifications' , component:NotificationComponent},
    {path: 'Profile' , component:ProfileComponent},
    {path: '', redirectTo: 'Admin', pathMatch: 'full'}  
  ]
}
,{path:'**' , component:NotFoundComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
