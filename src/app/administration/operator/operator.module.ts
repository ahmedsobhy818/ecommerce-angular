import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OPERATORRoutingModule } from './operator-routing.module';
import { OperatorComponent } from './operator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageStocksComponent } from './manage-stocks/manage-stocks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [OperatorComponent, DashboardComponent, ManageProductsComponent, ManageStocksComponent],
  imports: [
    CommonModule,
    OPERATORRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule 
  ]
})
export class OPERATORModule { }
