import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { OperatorComponent } from './operator.component';

const routes: Routes = [
  {path:'' , component:OperatorComponent}
  ,{path:'**' , component:NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OPERATORRoutingModule { }
