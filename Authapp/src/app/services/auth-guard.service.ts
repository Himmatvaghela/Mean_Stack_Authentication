import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if the user is authenticated
    const isAuthenticated = this.isAuthenticated();

    if (isAuthenticated) {
      return true; // Allow access to the route
    } else {
      // Redirect to the login page if not authenticated
      return this.router.createUrlTree(['/login']);
    }
  }

  private isAuthenticated(): boolean {
    // Check if the token is present in localStorage or implement your authentication logic
    const token = localStorage.getItem('token');
    return !!token; // Returns true if the token is present, false otherwise
  }
}
