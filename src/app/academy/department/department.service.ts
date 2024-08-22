import {Injectable} from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Department} from "./model/department.model";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = API_URLS.departments;

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartment(id: number): Observable<Department> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Department>(url);
  }

  createDepartment(department: Department): Observable<Department> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Department>(this.apiUrl, department, {headers});
  }

  updateDepartment(department: Department): Observable<Department> {
    const url = `${this.apiUrl}/${department.id}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Department>(url, department, {headers});
  }

  deleteDepartment(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
