import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../config/urls";
import {User} from "./model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = API_URLS.users;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  createUser(User: User): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<User>(this.apiUrl, User, {headers});
  }

  updateUser(User: User): Observable<User> {
    const url = `${this.apiUrl}/${User.id}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<User>(url, User, {headers});
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
