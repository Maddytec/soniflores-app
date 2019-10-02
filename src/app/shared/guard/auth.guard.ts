import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    shared: SharedService;

    constructor(private router: Router) {
        this.shared = SharedService.getInstance();
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        if (this.shared.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
