import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/services/admin.service';
import { LoadingService } from 'src/app/services/loading-service.service';
import { ProductsService } from 'src/app/services/products-service.service';
import { VendorService } from 'src/app/services/vendor.service';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';
import { NewCatComponent } from '../../admin/new-cat/new-cat.component';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  progress: number=0;
  message: string;
  uploadError=''
  dbPath
  showProgressBar=false
  Photo
  Logged
  AllCats:any[]
  CatID=null

  constructor(private service:VendorService,
    private pservice:ProductsService,
    private loadingService:LoadingService,
    private store:Store<StoreInterface>,
    public dialogRef: MatDialogRef<NewCatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {Item:any }) {

      data.Item.State=0//pending
      this.store.select(loggedSelector).subscribe(data=>{
        this.Logged=data        
        this.pservice.getAllCats().subscribe(
          data=>{
            this.AllCats=data['records']
            this.AllCats.splice(0,1)
        }
      )})
      this.loadingService.SmallLoadingBehaviour.subscribe(data=>{
        if(data==null)
        return;
  
        let SpinnerVarName=data.SpinnerVarName
        let ShowSpinner=data.ShowSpinner
        this[SpinnerVarName]=ShowSpinner
         
        
      })
      
     }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public uploadFile = (files) => {
    
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.service.uploadPhoto(formData,"showProgressBar",this.Logged.token)
      .subscribe(event => {
        //console.log(event)
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.uploadError=''
          //this.onUploadFinished.emit(event.body);
          this.dbPath=event.body["dbPath"]
          this.data.Item.Image=this.dbPath
        }
        
      },e=>{
       this.uploadError=(e.error instanceof ProgressEvent)?e.statusText :e.error;
        this.progress=0
        
      });
  }
  getImage(){
    var image= this.dbPath
    this.Photo=image
 
    if(image==undefined || image=='')
     {
       image=this.data.Item.Image
       this.Photo=image
     }
     return environment.AppName + "/images/Products/" + image
    } 
}
