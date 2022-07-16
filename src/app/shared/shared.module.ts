import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcludeIDsPipe } from './pipes/exclude-ids.pipe';




@NgModule({
  declarations: [ExcludeIDsPipe],
  imports: [
    CommonModule
  ],
  exports: [ExcludeIDsPipe]
})
export class SharedModule { }
