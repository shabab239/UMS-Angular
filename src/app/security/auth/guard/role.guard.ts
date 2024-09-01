import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRoles = route.data['roles'] as Array<string>;

    return this.authService.getRole().pipe(
      map(currentRole => currentRole ? expectedRoles.includes(currentRole) : false),
      tap(hasRole => {
        if (!hasRole) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
