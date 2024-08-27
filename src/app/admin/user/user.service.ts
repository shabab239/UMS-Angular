import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../config/urls";
import {User} from "./model/user.model";
import {StorageUtil} from "../../util/storage.util";
import {ApiResponse} from "../../util/api.response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = API_URLS.user;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/getAll`);
  }

  getUser(id: number): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  createUser(User: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, User);
  }

  updateUser(User: User): Observable<ApiResponse> {
    const url = `${this.apiUrl}/update/${User.id}`;
    return this.http.put<ApiResponse>(url, User);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse>(url);
  }
}
