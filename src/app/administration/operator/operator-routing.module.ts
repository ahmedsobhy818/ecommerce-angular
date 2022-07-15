import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageStocksComponent } from './manage-stocks/manage-stocks.component';
import { OperatorComponent } from './operator.component';

const routes: Routes = [
  {path:'' , component:OperatorComponent,children:[
    {path:'Dashboard' , component:DashboardComponent},
    {path: 'Products',component:ManageProductsComponent},
    {path: 'Stocks',component:ManageStocksComponent},
    {path: '', redirectTo: 'Dashboard', pathMatch: 'full'}
  ]}
  ,{path:'**' , component:NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OPERATORRoutingModule { }
