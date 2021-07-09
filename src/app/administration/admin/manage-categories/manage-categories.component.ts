import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/services/admin.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';
import { NewCatComponent } from '../new-cat/new-cat.component';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
Logged
Tree
error=null
success=false


  constructor(private store:Store<StoreInterface>,
    private service:AdminService,
    public dialog: MatDialog) {
      
      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
setTimeout(()=>{
  service.GetCatTree(this.Logged?.token).subscribe(data=>{
    this.Tree=data  
    console.log(this.Tree)  
    })
   
},1000)
      })
    }

  ngOnInit(): void {
  }
  activate(item){
    this.service.ActivateCategory(item.Id,this.Logged.token)
    .subscribe(data=>{
      var arr= data as Array<any>
      arr.forEach(s=>{
        this.Tree.filter(t=>{
          return t.Id==s.Id 
        })[0].State=true
        //console.log(s)
      })
    },e=>{
      this.HandleError(e);
      })
  }
  deActivate(item){
    this.service.DeActivateCategory(item.Id,this.Logged.token)
    .subscribe(data=>{
     var arr= data as Array<any>
     arr.forEach(s=>{
       this.Tree.filter(t=>{
         return t.Id==s.Id 
       })[0].State=false
     })
     // item.State=false 
    },e=>{
       this.HandleError(e);
      })
    
  }
  HandleError(e){
    if(e.status==401){
      this.error="Token expired , please log in"
     setTimeout(()=>{
       console.log("LOG OUT")
       this.store.dispatch(new LogoutAction())
     },3000)
    
   }

   // if(e.status==403){
   //   this.error = "You are not authorized to create new administrator"
   // }
    
    else
     this.error=e.error?.Message

     this.success=false
  }

  getimg(photo){
    let image=photo
    return environment.AppName + "/images/Categories/" + image
  }
  addNew(item){
    
    const dialogRef = this.dialog.open(NewCatComponent, {
      width: '800px',
      height:'800px',
      data: {Item:{
        parentID:item?.Id,
        Level:item?.Level+1,
        BaseID:item?.BaseID
      }}
    });

    dialogRef.afterClosed().subscribe(data=>{
      if(data!=undefined){  
        console.log(data)
        this.success=true
        this.error=null
        this.service.newCategory(data.Item,this.Logged.token).subscribe(ret=>{
          let x:number=-1//index of item inside the Tree
         if(item!=null){ 
          x= (this.Tree as Array<any>).findIndex((node,index)=>{
            if (node.Id==item.Id)
            return true
          })
        }
         let arr:Array<any>= (this.Tree as Array<any>)
         if(item!=null)
         data.Item.Chain=item.Chain + '-->' + data.Item.Name
         else
         {
           data.Item.Chain=data.Item.Name
           data.Item.Level=1
           data.Item.BaseID=(ret as any).ID
        }

         data.Item.Id=(ret as any).ID
         arr.splice(x+1,0,data.Item)
         this.Tree=arr
        },e=>{
          this.HandleError(e)
        })
       
       
      }
    })
  }
  edit(item){
    const dialogRef = this.dialog.open(NewCatComponent, {
      width: '800px',
      height:'800px',
      data: {Item:{
        Id:item.Id,
        Name:item.Name,
        ArabicName:item.ArabicName,
        Description:item.Description,
        Image:item.Image
      }}
    });

    dialogRef.afterClosed().subscribe(data=>{
      if(data!=undefined){
        this.success=true
        this.error=null       
       console.log(data.Item)
       //
       this.service.editCategory(data.Item,this.Logged.token).subscribe(ret=>{
         this.success=true
         this.error=null
         item.ArabicName=data.Item.ArabicName
         item.Description=data.Item.Description
         item.Image=data.Item.Image
  
         if(item.Level!=1)
          item.Chain=item.Chain.replace("-->"+item.Name,"-->"+data.Item.Name )
         else
          item.Chain=data.Item.Name 
          
          item.Name=data.Item.Name
       },e=>{
         this.HandleError(e)
       })
      

      }
    })

  }
}

