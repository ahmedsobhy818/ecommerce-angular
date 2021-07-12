import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/services/account.service';
import { LoadingService } from 'src/app/services/loading-service.service';
import { UpdateProfileAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  progress: number=0;
  message: string;
  uploadError=''
  dbPath
  showProgressBar=false
  Logged=null;
  Address
  Phone
  URL
  Photo
  showSpinner=false
  //@Output() public onUploadFinished = new EventEmitter();
  AdminModule=false
  constructor(private service:AccountService,
    private loadingService:LoadingService,
    private store:Store<StoreInterface>,
    private router:Router
    ) {
      this.AdminModule= router.url.startsWith("/administration/Profile")

     this.store.select(loggedSelector).subscribe(data=>{
       this.Logged=data
       this.Address=this.Logged?.Address
       this.Phone=this.Logged?.Phone
       this.URL=this.Logged?.URL
     }) 
    this.loadingService.SmallLoadingBehaviour.subscribe(data=>{
      if(data==null)
      return;

      let SpinnerVarName=data.SpinnerVarName
      let ShowSpinner=data.ShowSpinner
      if(ShowSpinner)
          this[SpinnerVarName]=ShowSpinner
       else{
          this[SpinnerVarName]=ShowSpinner
       
      } 
    })
   }

  ngOnInit(): void {
  }

  public uploadFile = (files) => {
    
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.service.uploadPhoto(formData,"showProgressBar")
      .subscribe(event => {
        //console.log(event)
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.uploadError=''
          //this.onUploadFinished.emit(event.body);
          this.dbPath=event.body["dbPath"]
          
        }
        
      },e=>{
        
        //console.log(e.error instanceof ProgressEvent) 
        this.uploadError=(e.error instanceof ProgressEvent)?e.statusText :e.error;
        this.progress=0
        
      });
  }
  getImage(){
   var image= this.dbPath
   this.Photo=image

   if(image==undefined || image=='')
    {
      image=this.Logged.PhotoURL
      this.Photo=image
    }
   if(image==undefined || image=='')
    image=this.Logged.Gender + ".png"

    
    return environment.AppName + "/images/users/" + image
  }

  Send(){
    
    var obj={
      Address:this.Address,
      Phone:this.Phone,
      token:this.Logged.token,
     URL:this.URL,
     Photo:this.Photo//,       ID:this.Logged.ID
    } 
    this.service.EditProfile(obj,"showSpinner").subscribe(data=>{
      
      this.store.dispatch(new UpdateProfileAction({
        Address:this.Address,
        Phone:this.Phone,
        Photo:this.Photo,
        URL:this.URL
      }))
    })    
  }
}
