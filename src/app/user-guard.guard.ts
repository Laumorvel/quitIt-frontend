import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserGuardGuard implements CanActivate {
  constructor(private router: Router) {}
  private rol = JSON.parse(<string>localStorage.getItem('user')).rol;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.rol == 'USER') {
      return true;
    } else {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'You must be a user to access this page',
      });
      this.router.navigateByUrl('');
      return false;
    }
  }
}
