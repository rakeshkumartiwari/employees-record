import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: any;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.setEmployeeList();
    this.employeeService.getEmployeeList.subscribe(data => this.employeeList = data);
  }

  onDelete(employeeId: number) {
    if (!confirm('Are you want to delete this record?')) {
      return false;
    }
    this.employeeService.deleteEmployee(employeeId).subscribe(data => this.getEmployeeList());
    this.getEmployeeList();
  }

  populateForm(employee: Employee) {
    this.employeeService.setEmployeeGroup(employee);
  }

}
