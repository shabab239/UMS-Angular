import { Injectable } from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../util/api.response.model";
import {Student} from "../student/model/student.model";
import {Program} from "./model/program.model";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private apiUrl = API_URLS.program;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  create(program: Program): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, program);
  }

  update(program: Program): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, program);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

}
