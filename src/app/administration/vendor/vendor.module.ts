import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VENDORRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';


@NgModule({
  declarations: [VendorComponent],
  imports: [
    CommonModule,
    VENDORRoutingModule
  ]
})
export class VENDORModule { }
