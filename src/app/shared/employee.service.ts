import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeGroup = new BehaviorSubject<any>(null);
  private employeeListSubject = new BehaviorSubject<any>([]);
  private loaderSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:56841/api';

  saveEmployee(employee) {
    return this.http.post(`${this.baseUrl}/Employee`, employee);
  }

  setEmployeeList() {
    this.http.get(`${this.baseUrl}/Employee`).subscribe(data => {
      if (data) {
        this.employeeListSubject.next(data);
      } else {
        this.employeeListSubject.next([]);
      }
    },
      err => this.employeeListSubject.next([]));
  }

  get getEmployeeList() {
    return this.employeeListSubject.asObservable();
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(`${this.baseUrl}/Employee/${employeeId}`);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(`${this.baseUrl}/Employee/${employee.EmplloyeeId}`, employee);
  }

  setEmployeeGroup(employee: Employee) {
    if (employee) {
      this.employeeGroup.next(employee);
    } else {
      this.employeeGroup.next(null);
    }
  }

  get getemployeeSubject() {
    return this.employeeGroup.asObservable();
  }

  setLoaderSubject(data: boolean) {
    this.loaderSubject.next(data);
  }

  get getLoderSubject() {
    return this.loaderSubject.asObservable();
  }

}
