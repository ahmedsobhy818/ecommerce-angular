import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ADMINRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ManageVendorsComponent } from './manage-vendors/manage-vendors.component';
import { ManageOperatorsComponent } from './manage-operators/manage-operators.component';


@NgModule({
  declarations: [
    AdminComponent, 
    ManageVendorsComponent, 
    ManageOperatorsComponent],
  imports: [
    CommonModule,
    ADMINRoutingModule
  ]
})
export class ADMINModule { }
