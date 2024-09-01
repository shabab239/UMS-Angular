import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth.service';
import {User} from "../../../admin/user/model/user.model";
import {AlertService} from "../../../util/alert.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;

    let user: User | null = this.authService.getStoredUser();
    const rolePart = user?.role.split('_')[1].toLowerCase();

    if (rolePart && expectedRoles.some(role => role.toLowerCase() === rolePart)) {
      return true;
    } else {
      this.alertService.error("Not authorized");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
