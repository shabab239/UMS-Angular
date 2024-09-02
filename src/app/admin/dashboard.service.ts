import { Injectable } from '@angular/core';
import {API_URLS} from "../config/urls";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../util/api.response.model";
import {Examination} from "../academy/examination/model/examination.model";
import {Mark} from "../academy/examination/model/mark.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = API_URLS.dashboard;

  constructor(private http: HttpClient) { }

  dashboard(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

}
