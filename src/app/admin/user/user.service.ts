import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../config/urls";
import {User} from "./model/user.model";
import {ApiResponse} from "../../util/api.response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = API_URLS.user;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  create(user: User, avatarFile?: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], {type: 'application/json'}));

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, formData);
  }

  update(user: User, avatarFile?: File): Observable<ApiResponse> {

    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], {type: 'application/json'}));

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, formData);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
