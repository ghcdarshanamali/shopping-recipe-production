import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "../services/auth-service";
import { Injectable, inject } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthGuard{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       
      return this.authService.user.pipe(take(1),
        map(user => {
        //return !!user;
        const isAuth = !!user;

        if(isAuth){
            return true;
        }
        return this.router.createUrlTree(['/login']);
       })); 
       
    }
    
}

export const IsAuthGuard : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {

    return inject(AuthGuard).canActivate(route, state);
}