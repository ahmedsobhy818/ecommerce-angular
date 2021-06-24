import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageOperatorsComponent } from './manage-operators/manage-operators.component';
import { ManageOtherAdminsComponent } from './manage-other-admins/manage-other-admins.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
//import { ManageVendorsComponent } from './manage-vendors/manage-vendors.component';
import { UpdateSettingsComponent } from './update-settings/update-settings.component';

const routes: Routes = [
  {path:'' , component:AdminComponent,children:[
    {path:'Dashboard' , component:DashboardComponent},
    //{path:'Vendors' , component:ManageVendorsComponent},
    {path: 'Operators',component:ManageOperatorsComponent},
    {path: 'Settings',component:UpdateSettingsComponent},
    {path: 'Roles',component:ManageRolesComponent},
    {path: 'OtherAdmins',component:ManageOtherAdminsComponent},
    {path: 'Categories',component:ManageCategoriesComponent},
    {path: '', redirectTo: 'Dashboard', pathMatch: 'full'}
  ]}
  ,{path:'**' , component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ADMINRoutingModule { }
