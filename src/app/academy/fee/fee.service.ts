import { Injectable } from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../util/api.response.model";
import {Semester} from "../semester/model/semester.model";
import {Fee} from "./model/fee.model";

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  private apiUrl = API_URLS.fee;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  create(semester: Semester): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, semester);
  }

  update(semester: Semester): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, semester);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  saveFees(fees: Fee[]): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/saveFees`, fees);
  }

  collectFees(fees: Fee[]): Observable<ApiResponse> {
    console.log(fees);
    return this.http.post<ApiResponse>(`${this.apiUrl}/collectFees`, fees);
  }

}
