import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  fData: any;
  currentPage = 0;
  pageInContent = 10;
  empForm: FormGroup;
  submitted = false;
  public noDataFound: boolean;
  totalRecords: any;
  constructor(private ser: ServiceService, private formBuilder: FormBuilder, private myRoute: Router) { }
  get f() { return this.empForm.controls; }
  reset() {
    this.empForm.reset();
    this.submitted = false;
  }
  ngOnInit(): void {
    this.getData();
    this.empForm = this.formBuilder.group({
      id: ['',  Validators.required],
      name: ['', Validators.required],
      sal: ['', Validators.required],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  getData() {
    this.ser.getAll(this.currentPage, this.pageInContent).subscribe(res => {
      this.fData = res['data'];
      this.totalRecords = res['totalRecords'];
      console.log(res);
    });
  }
  // pageChange(pageNo) {
  //   console.log(pageNo);
  //   if (pageNo) {
  //     this.currentPage = pageNo;
  //     this.getData();
  //   }
  // }
  onSubmit() {
    this.submitted = true;
    if (this.empForm.invalid) {
      return;
    }
    console.log(this.empForm.value);
    this.ser.addEmp(this.empForm.value).subscribe((response: any) => {
    console.log(response);
    this.getData();
    });
  }
  edit(data,i) {
    // console.log(d.name);
    this.empForm.setValue({
      id: i,
      name: data.name,
      sal: data.sal,
      city: data.city,
      phone: data.phone
    })
  }
  deleteEmployeeData(id) {
    alert(id)
    this.ser.deleteRecord(id).subscribe(Response=>{
      this.getData();
      console.log(Response);
    })
  }
  ID(id){ 
    this.ser.GetId(id).subscribe(res=>{
    //console.log("Get",res);
    this.myRoute.navigate(['/com2']); 
    });
    }
    update(){
      this.ser.update(this.empForm.value).subscribe(res=>{
        console.log(res);
      })
    }
}