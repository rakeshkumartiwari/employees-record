import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  isLoaderShow$: Observable<boolean>;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.isLoaderShow$ = this.employeeService.getLoderSubject;
  }

}
