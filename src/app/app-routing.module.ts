import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotificationComponent } from './components/notification/notification.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
  
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Products',component:HomeComponent},
  {path:'Products/Show/:ProductID', component:HomeComponent},
  {path:'Products/:CatName/:OrderBy/:PageSize/:PageIndex', component:HomeComponent},
  {path:'Products/:CatName/:OrderBy/:Keyword/:PageSize/:PageIndex', component:HomeComponent},
  {path:'ProductDetails/:id', component:ProductComponent},
  {path:'ProductDetails/:id/:action', component:ProductComponent},
  {path:'Products/Cart',component:CartComponent},
  {path:'Products/Wishlist',component:WishlistComponent},
  {path:'Products/Checkout',component:CheckoutComponent},
  {path:'Products/Orders',component:OrderComponent},
  {path:'Products/Orders/:id',component:OrderComponent},
  {path:'Account/Notifications',component:NotificationComponent},
  {path:'Account/Profile',component:ProfileComponent},
  //{path:'Login',component:LoginComponent},
  {path:'admin' , loadChildren:()=> import('./admin/admin.module').then(m => m.AdminModule)}//route to the admin module
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
