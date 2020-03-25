import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeGroup = new BehaviorSubject<any>(null);
  private employeeListSubject = new BehaviorSubject<any>([]);
  private loaderSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:56841/api';

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

  saveEmployee(employee) {
    return this.http.post(`${this.baseUrl}/Employee`, employee).pipe(catchError(this.handleError));
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

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
