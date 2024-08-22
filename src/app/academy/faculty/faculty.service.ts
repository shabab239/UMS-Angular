import { Injectable } from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Faculty} from "./model/faculty.model";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private apiUrl = API_URLS.faculties;

  constructor(private http: HttpClient) {
  }

  getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.apiUrl);
  }

  getFaculty(id: number): Observable<Faculty> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Faculty>(url);
  }

  createFaculty(Faculty: Faculty): Observable<Faculty> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Faculty>(this.apiUrl, Faculty, {headers});
  }

  updateFaculty(Faculty: Faculty): Observable<Faculty> {
    const url = `${this.apiUrl}/${Faculty.id}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Faculty>(url, Faculty, {headers});
  }

  deleteFaculty(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
