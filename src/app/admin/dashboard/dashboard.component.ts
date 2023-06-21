import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/services/contract-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  contractors: any;
  showModalFlag: boolean = false;
  contractorForm: FormGroup;
  editMode:boolean=false
  selectedContractor: any;
  constructor(private http: HttpClient,private appservice:AppServiceService,
    private formBuilder: FormBuilder,
    private router:Router) {}

  async ngOnInit() {
    this.contractorForm = this.formBuilder.group({
      name: ['', Validators.required],
      enabled: [false],
      vendor: [false,Validators.required],
      customer: [false,Validators.required],
      description: [''],
      address: [''],
      phones: [''],

    });
    this.loadData();
  }
  showModal() {
    this.contractorForm.reset()
    this.showModalFlag = true;
    this.editMode=false
  }
  closeModal() {
    this.showModalFlag = false;
  }
  createContractor(){

    if(this.editMode===false){
      
    
    const createdata = {
      data: {
        type: "contractors",
        attributes: {
          name: this.contractorForm.controls['name'].value,
          vendor: this.contractorForm.controls['vendor'].value,
          customer: this.contractorForm.controls['customer'].value|| false,
          enabled: this.contractorForm.controls['enabled'].value|| false,
          description: this.contractorForm.controls['description'].value,
          address: this.contractorForm.controls['address'].value,
          phones: this.contractorForm.controls['phones'].value,

        }
      }
    };
    
    
    this.appservice.createContract(createdata).subscribe((res)=>{
      console.log(res);
      this.ngOnInit()
      this.showModalFlag=false
    })
  }
  if(this.editMode===true){
    const updateData = {
      data: {
        type: "contractors",
        id: this.selectedContractor.id,
        attributes: {
          name: this.contractorForm.controls['name'].value,
          vendor: this.contractorForm.controls['vendor'].value,
          customer: this.contractorForm.controls['customer'].value,
          enabled: this.contractorForm.controls['enabled'].value,
          description: this.contractorForm.controls['description'].value,
          address: this.contractorForm.controls['address'].value,
          phones: this.contractorForm.controls['phones'].value,
          // ['external-id']:this.contractorForm.controls['externalId'].value
        }
      }
    };

    this.appservice.updateContract(updateData,this.selectedContractor.id).subscribe((res)=>{

      this.ngOnInit()
      
    },(error)=>{

      
    })
    this.showModalFlag=false
  }
  
  }

  async loadData() {
    // this.appservice.getContracts().subscribe((res)=>{
    //   this.contractors=res['data']
    // },(error)=>{
    //   if(error.status===401){
    //     console.log("error is",error);
        
    //     alert("your token has been expired!Please Login again")
    //     this.router.navigate(['/login'])
    //   }
      
    // })
    try {
      const res = await this.appservice.getContracts().toPromise();
      // console.log(res);
      this.contractors = res['data'];
 
      
    } catch (error) {
      alert("your token has been expired!Please Login again")
      this.router.navigate(['/login'])
      console.log("error is",error);
      
    }
  }

  
  editContractor(contractor: any) {
    this.editMode = true;
    this.showModalFlag = true;
    this.selectedContractor = contractor;

    this.contractorForm.patchValue({
      name: contractor.attributes.name,
      enabled: contractor.attributes.enabled,
      vendor: contractor.attributes.vendor,
      customer: contractor.attributes.customer,
      description: contractor.attributes.description,
      address: contractor.attributes.address,
      phones: contractor.attributes.phones,
      externalId: contractor.attributes['external-id']
    });
  }

  deleteContractor(contractorId: any) {
   const permission= window.confirm('do you really want to delete this?')
   if(permission){

   
    this.appservice.deleteContract(contractorId).subscribe((res)=>{
      this.ngOnInit()
    },(error)=>{
      if(error.status===401){
        alert("your token has been expired!Please Login again")
        this.router.navigate(['/login'])
      }
      
    })
  }
    
  }

 
}
