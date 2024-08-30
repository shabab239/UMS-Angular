import { Injectable } from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../util/api.response.model";
import {Student} from "./model/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = API_URLS.student;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  create(student: Student, avatarFile?: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('student', new Blob([JSON.stringify(student)], {type: 'application/json'}));

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, formData);
  }

  update(student: Student, avatarFile?: File): Observable<ApiResponse> {

    const formData = new FormData();
    formData.append('student', new Blob([JSON.stringify(student)], {type: 'application/json'}));

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, formData);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

}
