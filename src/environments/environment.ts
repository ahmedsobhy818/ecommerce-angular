// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isDotNetCore:true,
  AppName:'http://localhost:8020/Ecommerce-php',//url for the php api and images paths
  AppNameForDotNetCore:'https://localhost:44353'// url of the e.net core api - project TestEcommerceAPI hosted on visual studido's iis
  //AppNameForDotNetCore:'http://ahmedegypt7-002-site2.etempurl.com/EcommerceAPI'// url of the e.net core api - project TestEcommerceAPI hosted on my website
  //AppNameForDotNetCore:'https://localhost:8666'//'https://localhost:44353'// url of the e.net core api - project TestEcommerceAPI hosted on  iis
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
