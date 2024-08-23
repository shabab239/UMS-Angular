import { Injectable } from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "./model/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = API_URLS.students;

  constructor(private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(url);
  }

  createStudent(student: Student): Observable<Student> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Student>(this.apiUrl, student, {headers});
  }

  updateStudent(student: Student): Observable<Student> {
    const url = `${this.apiUrl}/${student.id}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Student>(url, student, {headers});
  }

  deleteStudent(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
