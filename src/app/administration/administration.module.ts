import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministratorComponent } from './administrator.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MyLogComponent } from './components/my-log/my-log.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ManageVendorsComponent } from './components/manage-vendors/manage-vendors.component';


@NgModule({
  declarations: [
    AdministratorComponent,FooterComponent, ChangePasswordComponent, MyLogComponent, ManageVendorsComponent
  ],
  imports: [    
    CommonModule,       
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ] 
})      
export class AdministrationModule { }
