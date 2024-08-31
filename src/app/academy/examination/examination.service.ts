import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../util/api.response.model';
import { Examination } from './model/examination.model';
import {API_URLS} from "../../config/urls";

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
  private baseUrl = API_URLS.examination;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/`);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`);
  }

  create(examination: Examination): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, examination);
  }

  update(examination: Examination): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/${examination.id}`, examination);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
  }
}
