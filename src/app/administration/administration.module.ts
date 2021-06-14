import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministratorComponent } from './administrator.component';


@NgModule({
  declarations: [
    AdministratorComponent
  ],
  imports: [    
    CommonModule,       
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
