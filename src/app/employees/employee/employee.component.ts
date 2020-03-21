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
  isClose: boolean;

  constructor(private employeeService: EmployeeService) { }

  employeeFormGroup: FormGroup;
  employee: Employee;

  ngOnInit() {
    this.init();
  }

  init() {
    this.employeeFormGroup = new FormGroup({
      FullName: new FormControl('', Validators.required),
      Mobile: new FormControl(''),
      EMPCode: new FormControl(''),
      Position: new FormControl(''),
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
    if (this.employeeFormGroup.valid) {
      this.employeeService.saveEmployee(this.employeeFormGroup.value).subscribe((data) => {
        if (data) {
          this.isClose = true;
          this.reset();
          this.setEmployeeList();
        }
      });
    }
  }

  reset() {
    this.employeeFormGroup.reset();
  }

  onClose() {
    this.isClose = false;
  }

setEmployeeList() {
    this.employeeService.setEmployeeList();
  }

}
