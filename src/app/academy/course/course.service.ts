import { Injectable } from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "./model/course.model";
import {ApiResponse} from "../../util/api.response.model";
import {Semester} from "../semester/model/semester.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = API_URLS.course;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  create(course: Course): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, course);
  }

  update(course: Course): Observable<ApiResponse> {
    console.log(course);
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, course);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

}
