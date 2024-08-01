import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Institute} from "./model/institute.model";
import {API_URLS} from "../../config/urls";

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  private apiUrl = API_URLS.institutes;

  constructor(private http: HttpClient) { }

  getInstitutes(): Observable<Institute[]> {
    return this.http.get<Institute[]>(this.apiUrl);
  }

  getInstitute(id: number): Observable<Institute> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Institute>(url);
  }

  addInstitute(institute: Institute): Observable<Institute> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Institute>(this.apiUrl, institute, { headers });
  }

  updateInstitute(institute: Institute): Observable<Institute> {
    const url = `${this.apiUrl}/${institute.id}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Institute>(url, institute, { headers });
  }

  deleteInstitute(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
