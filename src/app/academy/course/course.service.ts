import { Injectable } from '@angular/core';
import {API_URLS} from "../../config/urls";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "./model/course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = API_URLS.course;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourse(id: number): Observable<Course> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Course>(url);
  }

  createCourse(course: Course): Observable<Course> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Course>(this.apiUrl, course, {headers});
  }

  updateCourse(course: Course): Observable<Course> {
    const url = `${this.apiUrl}/${course.id}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Course>(url, course, {headers});
  }

  deleteCourse(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
