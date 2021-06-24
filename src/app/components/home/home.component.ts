import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith  } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products-service.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/Store/store';
import { IncrementQuantityAction, RemoveAllAction, RemoveProductAction, SetQuantityAction } from 'src/app/Store/actions/cart.action';
import { ToggleProductInWishlistAction } from 'src/app/Store/actions/wishlist.action';
import { Wishlist, wishlistSelector } from 'src/app/Store/reducers/wishlist.reducer';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { LoadingService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  
  Keyword:string=''
  myControl:FormControl=new FormControl()
  filteredProducts
  OrderBy//="Latest"
  OrderBy0// the initial "OrderBy" used on the navigator , if the user changes orderBy combo then hee will affect OrderBy not OrderBy0
  PageSize//="10"
PageSize0
  AllCats :any[]
  CatID//=0
 CatName//="All"
CatName0
 PageIndex
 showPager
 products
 result
 alert
 nPages
 nProducts
 ProductID
 showSpinner=false
 WishList:Wishlist
 
 
  constructor(private service:ProductsService,
    private router:Router,
    private route:ActivatedRoute,
    private store:Store<StoreInterface>,
    private loadidngService:LoadingService) {
 
      this.route.paramMap.subscribe(
        params=>{
          this.OrderBy=params.get('OrderBy')==null?'Latest':params.get('OrderBy')
          this.PageSize=params.get('PageSize')==null?'10':params.get('PageSize')
          this.CatName=params.get('CatName')==null?'All':params.get('CatName')
          this.OrderBy0=this.OrderBy
          this.PageSize0=this.PageSize
          this.CatName0=this.CatName
          this.Keyword=params.get('Keyword')==null?'':params.get('Keyword')
          this.PageIndex=params.get('PageIndex')==null?1:params.get('PageIndex')
          this.ProductID=params.get('ProductID')==null?-1:params.get('ProductID')

//console.log(this.ProductID)
          
          
          service.getCatID({"Name":this.CatName}).subscribe(
            data=>{
              this.CatID=data["ID"]
             if(this.ProductID==-1)
               this.show()
             else
              this.showSelectedProduct()  
            },
            e=>{
              this.CatID=0
            }
          )
        }
        )

        store.select(wishlistSelector).subscribe(data=>{
          
         this.WishList=data
        })
       
        //to show/hide small spinner beside the autocompleete
        loadidngService.SmallLoadingBehaviour.subscribe(data=>{
          if(data==null)
          return;

          let SpinnerVarName=data.SpinnerVarName// will equal "spinnerName" which is the value sent in the header of the request
          let ShowSpinner=data.ShowSpinner
          if(ShowSpinner)
           this[SpinnerVarName]=ShowSpinner
           else{
            setTimeout(() => {
              this[SpinnerVarName]=ShowSpinner
            }, 1000);}
        })
  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    

    this.myControl.valueChanges.pipe( //autocomplete element of angular material
      //to do this , in the input tag we added :[formControl]="myControl"
      //this is Reactive Forms technique , we must add "ReactiveFormsModule" in the imports of app.module
    debounceTime(500),
    distinctUntilChanged()   ,
    map(term=>{      
      let $arr:Observable<any>
     $arr=  term==""?of([{data:'No Data'}]): this.getProducts(term)
     return $arr     
  })
    ).subscribe(data=>{this.filteredProducts=data;  })
    
  /////
  this.service.getAllCats().subscribe(data=>this.AllCats=data['records'])
  this.Initialize()
  
  }
  Initialize(){
    this.products = [];  
    this.showPager=true;
  }
  show(){
    var obj={
      "PageIndex":this.PageIndex,
      "PageSize":this.PageSize,
      "Keyword":this.Keyword,
      "OrderBy":this.OrderBy,
      "CatID":this.CatID//,
      //"LoggedUserID":this.Logged?.ID  
     }; 

     this.service.getProducts(obj).subscribe(data=>{
      this.products=data['records'];
      this.nProducts=parseInt( data['nProducts'])
      this.result= data['nProducts'] + " Results Found";
      this.alert="success";
      this.showPager=true;
      this.nPages= (this.nProducts%this.PageSize) ==0?(this.nProducts/this.PageSize):Math.floor((parseInt( data['nProducts'])/this.PageSize))+1;  
      if(this.PageIndex>this.nPages)
        this.PageIndex=this.nPages
     },e=>{
       console.log(e)
      this.products=[];
      this.nProducts=0;
      this.result= e.error.message;
      this.alert="danger";
      this.showPager=false;
     })

  }
  showSelectedProduct()  {
    this.service.getAProduct({ID : this.ProductID}).subscribe
    (data=>{
      console.log(data)
      this.products=[]
      this.products.push(data)
      this.showPager=false
      this.result = "Product '" +data['Name'] +"' is found";
      this.alert="success"
    })
    
  }
  changePage(e){
    console.log(e)
    this.LoadPageIndex(e.pageIndex+1)
  }
getProducts(term)
{
  console.log(`term: ${term}`)
  
 return this.service.doAutocompletePrdoducts({
    "term":term
  },"showSpinner")
}
doSelectCat(e){
  //console.log(id)
 this.CatName= ( e.source.selected as MatOption).viewValue
//alert(s)
 //$location.path(settings.BaseUrl + '/All/' + dataScope.OrderBy + '/' + ui.item.label.split('-')[0] + '/' + dataScope.PageSize + '/1');
 //
}
doSelectProduct(id){
  if(id!=undefined)
  this.router.navigate(['Products','Show',id]);   
}
  
doSearch(){
    this.LoadPageIndex(1,true)
  }
  LoadPageIndex(x,newSearch:boolean=false){
    //var url= "Products/" + this.CatName + "/" + this.OrderBy + "/" ;
   //alert(this.Keyword)
   let OrderBy=this.OrderBy
   let PageSize=this.PageSize
   let CatName=this.CatName
   if(!newSearch){
    OrderBy=this.OrderBy0
    PageSize=this.PageSize0
    CatName=this.CatName0
   }
   //reload
   this.router.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
  };
   //
   if(this.Keyword!='')
     this.router.navigate(['Products',CatName,OrderBy,this.Keyword,PageSize,x]);   
    else
     this.router.navigate(['Products',CatName,OrderBy,PageSize,x]);   
//console.log(url)
    //$location.path(url + x);
    //this.router.navigate([url])//['Products']);   
    
    //$scope.PageIndex=x;
    //$scope.show();    
  }
  getImagePath=function(id){
    return environment.AppName +  "/images/"+ id+ ".jpg"         
}
showProduct(id:number){
  this.router.navigate(['ProductDetails',id]);   
}
addToCart(Product:any) /*(ProductID:number ,price:number)*/{
    //this.store.dispatch(new IncrementQuantityAction({product_id:ProductID , price:price }))  //the component dispatchs an action to the reducer  
    this.store.dispatch(new IncrementQuantityAction({product:Product }))  //the component dispatchs an action to the reducer  

}
addToWishlist(Product:any) /*(ProductID:number ,price:number)*/{
  this.store.dispatch(new ToggleProductInWishlistAction({product:Product }))  //the component dispatchs an action to the reducer  
}
getWishListLabel(product:any){
  let items=this.WishList.wishlistItems.filter(
    function(item){
      return item.product.ID==product.ID
    }
  )
return items.length==0?  "Add To" :  "Remove From"
}
}
