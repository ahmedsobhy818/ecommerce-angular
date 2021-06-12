import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import {MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule  } from '@angular/material/autocomplete'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule }  from '@angular/material/card'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTabsModule } from '@angular/material/tabs'
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu'
import { MatBadgeModule } from '@angular/material/badge'
import { MatDividerModule } from '@angular/material/divider'
import {  MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import  {MatDialogModule } from '@angular/material/dialog'
import {MatRadioModule} from '@angular/material/radio'
import {MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressBarModule } from '@angular/material/progress-bar';
//module for using material cmponents

let materialComponents=[
  MatButtonModule  ,
MatInputModule,
MatIconModule  ,
MatFormFieldModule,
MatAutocompleteModule,
MatSelectModule,
MatCardModule,
MatPaginatorModule,
MatToolbarModule,
MatProgressSpinnerModule,
MatTabsModule,
MatMenuModule,
MatBadgeModule,
MatDividerModule,
MatTableModule,
MatTooltipModule,
MatDialogModule,
MatRadioModule,
MatSnackBarModule,
MatProgressBarModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialComponents
  ],
  exports:[materialComponents]//export the material components to the app.module
  //we can do this technique with any custom module . so we can do new module with new components then export it to app.module 
})
export class MaterialModule { }
