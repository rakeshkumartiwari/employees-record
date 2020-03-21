import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  isShow: boolean;
  EmpId: number;
  message: string;

  constructor(private employeeService: EmployeeService) { }

  employeeFormGroup: FormGroup;
  employee: Employee;

  ngOnInit() {
    this.init();
  }

  init() {
    this.employeeService.getemployeeSubject.subscribe(
      data => {
        if (data) {
          this.EmpId = data.EmplloyeeId;
          this.employeeFormGroup.setValue({
            EmplloyeeId: data.EmplloyeeId,
            FullName: data.FullName,
            Mobile: data.Mobile,
            EMPCode: data.EMPCode,
            Position: data.Position,
          });
        } else {
          this.employeeFormGroup = new FormGroup({
            EmplloyeeId: new FormControl(null),
            FullName: new FormControl('', Validators.required),
            Mobile: new FormControl(''),
            EMPCode: new FormControl(''),
            Position: new FormControl(''),
          });
        }
      });

  }

  get FullName() {
    return this.employeeFormGroup.get('FullName');
  }

  get Mobile() {
    return this.employeeFormGroup.get('Mobile');
  }
  get EMPCode() {
    return this.employeeFormGroup.get('EMPCode');
  }
  get Position() {
    return this.employeeFormGroup.get('Position');
  }

  onSubmit() {
    if (this.employeeFormGroup.valid && this.employeeFormGroup.get('EmplloyeeId').value == null) {
      this.employeeService.saveEmployee(this.employeeFormGroup.value).subscribe((data) => {
        if (data) {
          this.isShow = true;
          this.message = 'Saved Successfully.';
          this.reset();
          this.setEmployeeList();
        }
      });
    } else {
      this.employeeService.updateEmployee(this.EmpId, this.employeeFormGroup.value).subscribe(data => {
        this.isShow = true;
        this.message = 'Updated Successfully.';
        this.reset();
        this.setEmployeeList();
      });
    }
  }

  reset() {
    this.employeeFormGroup.reset();
  }

  onClose() {
    this.isShow = false;
  }

  setEmployeeList() {
    this.employeeService.setEmployeeList();
  }

}
