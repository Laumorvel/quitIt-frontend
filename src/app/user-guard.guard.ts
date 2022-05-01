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
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (JSON.parse(<string>localStorage.getItem('user')) != null && JSON.parse(<string>localStorage.getItem('user')).rol == 'USER') {
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
