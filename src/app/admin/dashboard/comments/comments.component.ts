import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceService } from 'src/app/services/account-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  token: string;
  accounts: any;
  accountForm: FormGroup;
  editMode:boolean=false;
  selectedAccount: any;
  isAddAccountModalOpen = false;
  constructor(private http:HttpClient,
    private formBuilder: FormBuilder,private acountservice:AccountServiceService,
    private router:Router){

  }
  ngOnInit(){
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      balance: ['', Validators.required],
      minBalance: ['', Validators.required],
      maxBalance: ['', Validators.required],
    });
  this.loadData()
 
    
  }
 async loadData(){
    // this.acountservice.getAccounts().subscribe((res)=>{
    //   console.log('data', res);
    //   this.accounts=res['data']
    // },(error)=>{
    //   if(error.status===401){
    //     alert("your token has been expired!Please Login again")
    //     this.router.navigate(['/login'])
    //   }
      
    // })
    try {
      const res = await this.acountservice.getAccounts().toPromise();
      // console.log(res);
      this.accounts = res['data'];
 
      
    } catch (error) {
      alert("your token has been expired!Please Login again")
      this.router.navigate(['/login'])
      console.log("error is",error);
      
    }
  }
 

  openAddAccountModal() {
    this.accountForm.reset()
    this.editMode=false
    this.isAddAccountModalOpen = true;
  }

  closeAddAccountModal() {
    this.isAddAccountModalOpen = false;
  }
  addAccount(){
    if(this.editMode===false){

    
    const payload = {
      data: {
        type: 'accounts',
        attributes: {
          name: this.accountForm.controls['name'].value,
          'min-balance': this.accountForm.controls['minBalance'].value,
          'max-balance': this.accountForm.controls['maxBalance'].value,
         
        },
        relationships: {
          contractor: {
            data: {
              type: 'contractors',
              id: 4
            }
          },
          timezone: {
            data: {
              type: 'timezones',
              id: 1
            }
          }
        }
      }
    };
    this.acountservice.createAccount(payload).subscribe((res)=>{
      console.log(res);
      this.isAddAccountModalOpen=false
      this.loadData()
      
  },(error)=>{
    console.log(error);
    
  })
}
  else if(this.editMode===true){
    const updatePayload = {
      data: {
        type: 'accounts',
        id:this.selectedAccount.id,
        attributes: {
          name: this.accountForm.controls['name'].value,
          'min-balance': this.accountForm.controls['minBalance'].value,
          'max-balance': this.accountForm.controls['maxBalance'].value,
         
        },
        relationships: {
          contractor: {
            data: {
              type: 'contractors',
              id: 4
            }
          },
          timezone: {
            data: {
              type: 'timezones',
              id: 1
            }
          }
        }
      }
    };
    this.acountservice.updateAccount(updatePayload,this.selectedAccount.id).subscribe((res)=>{
      console.log(res);
      this.isAddAccountModalOpen=false
      this.loadData()
    },(error)=>{
      console.log(error);
      
    })
  }
  }
  deleteAccount(id){
    const permission= window.confirm('do you really want to delete this?')
    if(permission){

    
    this.acountservice.deleteAccount(id).subscribe((res)=>{
      console.log(res);
      this.loadData()
      
    },(error)=>{
      console.log(error);
      
    })
  }
  }
  editAccount(accounrt){
    this.isAddAccountModalOpen=true
    this.editMode = true;

    this.selectedAccount = accounrt;
    this.accountForm.patchValue({
      name:this.selectedAccount.attributes.name,
      minBalance : this.selectedAccount.attributes["min-balance"],
      maxBalance : this.selectedAccount.attributes["min-balance"],
    })


  }
}
