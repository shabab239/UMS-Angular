import {Injectable} from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Department} from "./model/department.model";
import {ApiResponse} from "../../util/api.response.model";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = API_URLS.department;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  create(department: Department): Observable<ApiResponse> {
    const url = `${this.apiUrl}/save`;
    return this.http.post<ApiResponse>(url, department);
  }

  update(department: Department): Observable<ApiResponse> {
    const url = `${this.apiUrl}/update`;
    return this.http.put<ApiResponse>(url, department);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
