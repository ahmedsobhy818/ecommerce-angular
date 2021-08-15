import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VENDORRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageMyProductsComponent } from './manage-my-products/manage-my-products.component';
import { ManageMyStocksComponent } from './manage-my-stocks/manage-my-stocks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { NewProductComponent } from './new-product/new-product.component';


@NgModule({
  declarations: [VendorComponent, DashboardComponent, ManageMyProductsComponent, ManageMyStocksComponent, NewProductComponent],
  imports: [
    CommonModule,
    VENDORRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule    
  ]
})
export class VENDORModule { }
