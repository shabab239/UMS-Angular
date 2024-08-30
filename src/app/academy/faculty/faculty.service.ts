import { Injectable } from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Faculty} from "./model/faculty.model";
import {ApiResponse} from "../../util/api.response.model";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private apiUrl = API_URLS.faculty;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  create(faculty: Faculty): Observable<ApiResponse> {
    const url = `${this.apiUrl}/save`;
    return this.http.post<ApiResponse>(url, faculty);
  }

  update(faculty: Faculty): Observable<ApiResponse> {
    const url = `${this.apiUrl}/update`;
    return this.http.put<ApiResponse>(url, faculty);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
