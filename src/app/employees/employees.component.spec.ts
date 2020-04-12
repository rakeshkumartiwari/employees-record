import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EmployeeService } from '../shared/employee.service';
import { EmployeesComponent } from './employees.component';


describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let mockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      providers: [EmployeeService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    mockService = TestBed.get(EmployeeService);
  });

  it('should set isLoaderShow$', (done) => {
    spyOnProperty(mockService, 'getLoderSubject', 'get').and.returnValue(of(true));
    fixture.detectChanges();
    component.isLoaderShow$.subscribe(data => {
      expect(data).toBeTruthy();
      done();
    });
  });
});
