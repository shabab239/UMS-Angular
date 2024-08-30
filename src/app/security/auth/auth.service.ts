import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {Token} from "./token.model";
import {API_URLS} from "../../config/urls";
import {ApiResponse} from "../../util/api.response.model";
import {StorageUtil} from "../../util/storage.util";
import {User, UserRole, UserRoleMap} from "../../admin/user/model/user.model";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) {}

  login(token: Token): Observable<boolean> {
    const payload = { username: token.username, password: token.password };

    return this.httpClient.post<ApiResponse>(API_URLS.login, payload).pipe(
      map(response => {
        if (response.successful) {
          const jwt = response.data.jwt;
          const user = response.data.user;
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

  getRole(): Observable<UserRole | null> {
    return this.currentUser$.pipe(
      map(user => user ? user.role : null)
    );
  }

  getRoleFromMap(): Observable<string | null> {
    return this.currentUser$.pipe(
      map(user => user ? UserRoleMap[user.role] : null)
    );
  }


  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  private getStoredUser(): User | null {
    return StorageUtil.getFromLocalStorage('sessionUser');
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

  getAuthToken(): string | null {
    return StorageUtil.getFromLocalStorage('jwt');
  }

}
