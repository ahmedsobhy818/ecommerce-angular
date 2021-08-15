import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageMyProductsComponent } from './manage-my-products/manage-my-products.component';
import { ManageMyStocksComponent } from './manage-my-stocks/manage-my-stocks.component';
import { VendorComponent } from './vendor.component';

const routes: Routes = [
  {path:'' , component:VendorComponent,children:[
    {path:'Dashboard' , component:DashboardComponent},
    {path: 'Products',component:ManageMyProductsComponent},
    {path: 'Stocks',component:ManageMyStocksComponent},
    {path: '', redirectTo: 'Dashboard', pathMatch: 'full'}
  ]}
  ,{path:'**' , component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VENDORRoutingModule { }
