import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeConst } from '../employee-const';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService, private toastr: ToastrManager) { }

  employeeFormGroup: FormGroup;
  employee: Employee;

  ngOnInit() {
    this.init();
  }

  init() {
    this.employeeService.getemployeeSubject.subscribe(
      data => {
        if (data) {
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
    this.employeeService.setLoaderSubject(true);
    if (this.employeeFormGroup.valid && this.employeeFormGroup.get('EmplloyeeId').value == null) {
      this.employeeService.saveEmployee(this.employeeFormGroup.value).subscribe((data) => {
        if (data) {
          this.reset(EmployeeConst.SAVED);
        }
      },
        err => {
          this.toastr.errorToastr(err);
          this.employeeService.setLoaderSubject(false);
        });
    } else {
      this.employeeService.updateEmployee(this.employeeFormGroup.value).subscribe(data => {
        this.reset(EmployeeConst.UPDATED);
      },
        err => {
          this.toastr.errorToastr(err);
          this.employeeService.setLoaderSubject(false);
        });
    }
  }

  resetFormGroup() {
    this.employeeFormGroup.reset();
    Object.keys(this.employeeFormGroup.controls).forEach(key => {
      this.employeeFormGroup.get(key).setErrors(null);
    });
    this.employeeService.setLoaderSubject(false);
  }

  reset(message: string) {
    this.setEmployeeList();
    this.resetFormGroup();
    this.toastr.successToastr(message);
  }

  setEmployeeList() {
    this.employeeService.setEmployeeList();
  }

  onCancel() {
    this.resetFormGroup();
  }

  onChange(control) {
    if (isNaN(this.employeeFormGroup.get(control).value)) {
      this.employeeFormGroup.controls[control].setValue('');
    }
  }

}
