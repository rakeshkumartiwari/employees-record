import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeListSubject = new BehaviorSubject<any>([]);

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
    });
  }

  get getEmployeeList() {
    return this.employeeListSubject.asObservable();
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(`${this.baseUrl}/Employee/${employeeId}`);
  }
}
