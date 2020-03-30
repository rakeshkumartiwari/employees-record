import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: any;
  constructor(private employeeService: EmployeeService, private toastr: ToastrManager) { }

  ngOnInit() {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.setEmployeeList();
    this.employeeService.getEmployeeList.subscribe(
      data => this.employeeList = data,
      error => this.toastr.errorToastr(error.message)
      );
  }

  onDelete(employeeId: number) {
    if (!confirm('Are you want to delete this record?')) {
      return false;
    }
    this.employeeService.deleteEmployee(employeeId).subscribe(data => this.getEmployeeList());
    this.getEmployeeList();
    this.toastr.successToastr('Deleted Successfully.');
  }

  populateForm(employee: Employee) {
    this.employeeService.setEmployeeGroup(employee);
  }

}
