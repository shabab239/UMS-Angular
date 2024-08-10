import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {Token} from "./token.model";
import {API_URLS} from "../../config/urls";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) {
    this.isAuthenticatedSubject.next(this.isLoggedIn());
  }

  login(token: Token): Observable<boolean> {
    let params = new HttpParams();
    params = params.append('username', token.username!);
    params = params.append('password', token.password!);

    return this.httpClient.get<Token[]>(API_URLS.tokens, {params}).pipe( // Using this Get req temporarily as there is no backend
      map(tokens => {
        const foundToken = tokens.find(t => t.username === token.username);
        if (foundToken && foundToken.password === token.password) {
          const jwtToken = btoa(`${foundToken.username}:${foundToken.password}`); // Fake JWT token - simple base64 encoded
          localStorage.setItem('jwtToken', jwtToken);
          localStorage.setItem('sessionUser', JSON.stringify(foundToken.user));
          this.isAuthenticatedSubject.next(true);
          return true;
        } else {
          this.isAuthenticatedSubject.next(false);
          return false;
        }
      })
    );

    /*return this.httpClient.post<Token>(API_URLS.tokens, {}).pipe(
      tap((response: Token) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
        }
      })
    );*/
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwtToken') !== null;
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }

  getUser(): string | null {
    const user = localStorage.getItem("sessionUser");
    return user ? JSON.parse(user) : null;
  }

  getSessionInstituteId(): number | undefined { //In future this will be derived from jwt token in spring
    const user = localStorage.getItem("sessionUser");
    return user ? JSON.parse(user).instituteId : undefined;
  }

  logout(): void {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("sessionUser");
    this.isAuthenticatedSubject.next(false);
  }
}
