import { Injectable } from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../util/api.response.model";
import {Examination} from "../examination/model/examination.model";

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private baseUrl = API_URLS.result;

  constructor(private http: HttpClient) { }

  getAllByExamination(examinationId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/getAllByExamination?examinationId=${examinationId}`);
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
