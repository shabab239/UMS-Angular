import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {Token} from "./token.model";
import {API_URLS} from "../../config/urls";
import {ApiResponse} from "../../util/api.response.model";
import {StorageUtil} from "../../util/storage.util";
import {User, UserRole} from "../../admin/user/model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) {
    this.isAuthenticatedSubject.next(this.isLoggedIn());
    this.currentUserSubject.next(this.getCurrentUser());
  }

  login(token: Token): Observable<boolean> {
    let username = token.username;
    let password =token.password;
    const payload = { username, password };

    return this.httpClient.post<ApiResponse>(API_URLS.login, payload).pipe(
      map(response => {
        if (response.successful) {
          let jwt = response.data.jwt;
          let user = response.data.user;
          StorageUtil.saveToLocalStorage('jwt', jwt);
          StorageUtil.saveToLocalStorage('sessionUser', user);

          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(user);
          return true;
        } else {
          this.isAuthenticatedSubject.next(false);
          this.currentUserSubject.next(null);
          return false;
        }
      })
    );
  }

  getRoles(): UserRole | null {
    const user = this.getCurrentUser();
    if (user) {
      return user.role;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return StorageUtil.getFromLocalStorage('jwt') !== null;
  }

  logout(): void {
    StorageUtil.removeFromLocalStorage('jwt');
    StorageUtil.removeFromLocalStorage('sessionUser');

    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    const user = StorageUtil.getFromLocalStorage('sessionUser');
    return user ? user : null;
  }

  getAuthToken(): string | null {
    return StorageUtil.getFromLocalStorage('jwt');
  }
}
