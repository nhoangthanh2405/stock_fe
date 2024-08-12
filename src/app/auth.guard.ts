import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.storageService.isLoggedIn();
    if (isLoggedIn) {
      console.log("Cao cao cao");
      return true;
    } else {
      console.log("Cao cao cao 11");
      // Redirect to login if not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}
