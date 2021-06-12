import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './Store/store';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEeffect } from './Store/effects/settings.effect';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { OrderComponent } from './components/order/order.component';
import { APP_INITIALIZER } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignalrHubServiceForUser } from './services/HubsServices/signalr-hub-service.service';
import { SignalrGeneralHubService } from './services/HubsServices/signalr-general-hub.service';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MyInterceptor } from './interceptor';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Service0Service } from './services/service0.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    SignupComponent,
    OrderComponent,
    WishlistComponent,
    SpinnerComponent,
    NotificationComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,//MaterialModule exports material components to app.module
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers /*{counter:counterReducer}*/),  //"reducers"  contains all reducers in the store
    EffectsModule.forRoot([SettingsEeffect])//register the seettings effect
    
    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:MyInterceptor,
      multi:true
    },
    Service0Service,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: Service0Service) => () => service.Initialize(),
      deps: [Service0Service],
      multi: true
    },
    SignalrGeneralHubService,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService2: SignalrGeneralHubService) => () => signalrService2.initiateSignalrConnection(),
      deps: [SignalrGeneralHubService],
      multi: true
    },
    SignalrHubServiceForUser,
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: SignalrHubServiceForUser) => () => signalrService.initiateSignalrConnection(),
      deps: [SignalrHubServiceForUser],
      multi: true, 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  /**
   *
   */
  constructor() {
    
    //if(environment.isDotNetCore)
    //  environment.AppName=environment.AppNameForDotNetCore
     
  }
}
function routes(routes: any, arg1: { onSameUrlNavigation: "reload"; }): any {
  throw new Error('Function not implemented.');
}

