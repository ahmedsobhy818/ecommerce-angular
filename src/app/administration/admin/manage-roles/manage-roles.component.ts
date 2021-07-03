import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { SimpleEditorDialogComponent } from 'src/app/components/simple-editor-dialog/simple-editor-dialog.component';
import { AdminService } from 'src/app/services/admin.service';
import { LogoutAction } from 'src/app/Store/actions/logged.action';
import { loggedSelector } from 'src/app/Store/reducers/logged.reducer';
import { StoreInterface } from 'src/app/Store/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {

  Logged
  roles
  errorMessage=null
  CurrentRole=-1
  newRole=false
  error=null
  success=false
  operators 

  constructor(private store:Store<StoreInterface>,
    private service:AdminService,
    public dialog: MatDialog) {
      store.select(loggedSelector).subscribe(data=>{
        this.Logged=data
setTimeout(()=>{
  service.GetRoles(this.Logged?.token).subscribe(data=>{
    this.roles=data    
    })
    service.GetOperators(this.Logged.token).subscribe(
      data=>{
        console.log(data)
        this.operators=data
      }
      )
},1000)
      })

     
   }
 
   openRole(Id){
if(this.CurrentRole==Id)
    this.CurrentRole=-1;
else
    this.CurrentRole=Id

   }
  ngOnInit(): void {
  }
  getimg(photo,Gender){
    let image=photo
    if(image=="")
      image=Gender + ".png"
    return environment.AppName + "/images/users/" + image
  }
  doCancel(){
   this. newRole=false
  }
  addNew(f){
    
    this.service.AddRole(this.Logged.token,f.form.value.name).subscribe(data=>{
      this.error=null
      this.success=true;
      this.newRole=false
      
      this.roles.push({
        RoleId : data['RoleId'] ,
                RoleName : data['RoleName'],
                RoleNormalizedName : data['RoleNormalizedName'],
                Readonly :data['Readonly'],
                Users:[]
      })
    },e=>{
     this.HandleError(e)
    })
  }
  doAdd(){
    this.newRole=true
  }
  addUserToRole(role){
    //console.log(role)
    var userId=role.SelectedOperator
    var roleId=role.RoleId
   if(userId==undefined){
     this.error="Please Enter Operator"
     this.success=false
     return;
   }
   this.service.addUserToRole(this.Logged.token, userId,roleId).subscribe(data=>{
      role.Users.push(data)
      role.SelectedOperator=undefined
      this.error=null
      this.success=true;
   },e=>{
    this.HandleError(e)
   })
    
  }

  DeleteRole(role){
    var roleId=role.RoleId
    var name=role.RoleNormalizedName

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      height:'300px',
      data: {question: 'Are you sure. You will delete role : ' + name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result=='Yes'){
        this.service.deleteRole(this.Logged.token,role.RoleId).subscribe(data=>{
          this.success=true
          var arr=(this.roles as any[])
          var x=arr.indexOf(role)
          arr.splice(x,1)
        },e=>{
          this.HandleError(e)
        })
      }
    });
  }
  EditRole(role){
    var roleId=role.RoleId
    var name=role.RoleNormalizedName
    const dialogRef = this.dialog.open(SimpleEditorDialogComponent, {
      width: '600px',
      height:'300px',
      data: {label:'Role Name' , answer:name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=undefined){
        if(result==''){
              this.error="Please Eenter Valid Role Name"
              this.success=false
        }
        else{
        this.service.editRole(this.Logged.token,role.RoleId,result).subscribe(data=>{
          role.RoleNormalizedName=result
          this.success=true
          this.error=null
        },e=>{
          this.HandleError(e)
        })
      }
        
        
      }
    });
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
}
