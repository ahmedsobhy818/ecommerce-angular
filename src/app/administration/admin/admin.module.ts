import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ADMINRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
//import { ManageVendorsComponent } from './manage-vendors/manage-vendors.component';
import { ManageOperatorsComponent } from './manage-operators/manage-operators.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from '../components/footer/footer.component';
import { UpdateSettingsComponent } from './update-settings/update-settings.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManageOtherAdminsComponent } from './manage-other-admins/manage-other-admins.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { SettingsEeffect } from 'src/app/Store/effects/settings.effect';
import { reducers } from 'src/app/Store/store';
  

@NgModule({
  declarations: [
    AdminComponent, 
    //ManageVendorsComponent, 
    ManageOperatorsComponent,
     DashboardComponent,
     UpdateSettingsComponent,
     ManageRolesComponent,
     ManageOtherAdminsComponent,
     ManageCategoriesComponent//,
     //FooterComponent
    ],
  imports: [
    CommonModule,
    ADMINRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    MaterialModule/*,//MaterialModule exports material components to app.module
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers ),
    EffectsModule.forRoot([SettingsEeffect])//register the seettings effect
   */
  ]
})
export class ADMINModule { }
