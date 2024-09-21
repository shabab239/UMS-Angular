import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../util/api.response.model';
import { Examination } from './model/examination.model';
import {API_URLS} from "../../config/urls";
import {Mark} from "./model/mark.model";

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
  private baseUrl = API_URLS.examination;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/`);
  }

  getAllMarksByExaminationAndCourse(examinationId: number, courseId: number): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('examinationId', examinationId.toString())
      .set('courseId', courseId.toString());
    return this.http.get<ApiResponse>(`${this.baseUrl}/getAllMarksByExaminationAndCourse`, { params });
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`);
  }

  create(examination: Examination): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/save`, examination);
  }

  saveMarks(marks: Mark[]): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/saveMarks`, marks);
  }

  update(examination: Examination): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/update`, examination);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
  }

  processExamination(examinationId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/processExamination?examinationId=${examinationId}`, {});
  }

  getResult(studentId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/getResult?studentId=${studentId}`, {});
  }

  getResultsByExamination(examinationId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/getResultsByExamination/${examinationId}`, {});
  }

}
