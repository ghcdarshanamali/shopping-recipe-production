import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable, inject } from "@angular/core";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class AuthGuard{
    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
    //return this.authService.user.pipe(
      return this.store.select('auth').pipe(
        take(1),map(authState => {
            return authState.user;
        }),
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