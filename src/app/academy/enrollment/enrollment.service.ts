import {Injectable} from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Enrollment} from "./model/enrollment.model";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = API_URLS.enrollments;

  constructor(private http: HttpClient) {
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  getEnrollment(id: number): Observable<Enrollment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Enrollment>(url);
  }

  createEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Enrollment>(this.apiUrl, enrollment, {headers});
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    const url = `${this.apiUrl}/${enrollment.id}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Enrollment>(url, enrollment, {headers});
  }

  deleteEnrollment(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
