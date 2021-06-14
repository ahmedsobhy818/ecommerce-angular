import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OPERATORRoutingModule } from './operator-routing.module';
import { OperatorComponent } from './operator.component';


@NgModule({
  declarations: [OperatorComponent],
  imports: [
    CommonModule,
    OPERATORRoutingModule
  ]
})
export class OPERATORModule { }
