import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  
  constructor(private router: Router) { }
  /**
   * Can activate function
   * @param next The activated route snapshot object
   * @param state The router state snapshot object
   */
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) { return true; }
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
    return false;
  }
}
