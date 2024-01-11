import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";

export interface AuthResponseData{

    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    //user = new Subject<User>();
   // user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer : any; 
    
    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>){}
/*
signup(emailValue: string, passwordValue: string){
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
    {   email:emailValue,
        password: passwordValue,
        returnSecureToken: true })
        .pipe(catchError(this.handleError), 
          tap( resData => {
             this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
}

login(emailValue: string, passwordValue: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
    {   email:emailValue,
        password: passwordValue,
        returnSecureToken: true
    }).pipe(catchError(this.handleError),
     tap( resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
     }));
}
private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
 
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000); 
    const user = new User(email, userId, token, expireDate);
   // this.user.next(user);
   this.store.dispatch(new AuthActions.AuthenticateSuccess({email: email, userId: userId, token: token, expirationDate: expireDate}));
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
}

private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occcured!';

    if(!errorRes.error || !errorRes.error.error){

        return throwError((() => errorMessage));
    }

    switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS': 
            errorMessage = 'This email exists already.';
            break;

        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exists.';
            break;

        case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;

        case 'INVALID_LOGIN_CREDENTIALS':
            errorMessage = 'Invalid username or password.';
            break;
    }
    return throwError((() => errorMessage));
}
 autoLogin(){
   const userData : {
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: string
   } =  JSON.parse(localStorage.getItem('userData'));

   if(!userData){
    return;
   }
   const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

   if(loadedUser.token){
   // this.user.next(loadedUser);
   this.store.dispatch(new AuthActions.AuthenticateSuccess({email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)}));
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
    new Date().getTime();
    this.autoLogout(expirationDuration);
   }
} 
logout(){
   // this.user.next(null);
   this.store.dispatch(new AuthActions.AuthenticateFail());
    //this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
}*/

setLogoutTimer(expirationDuration: number){

    this.tokenExpirationTimer = setTimeout(()=>{
       // this.logout();
this.store.dispatch(new AuthActions.AuthenticateFail());
    },expirationDuration)
}

clearLogoutTimer(){
    if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
    }
}
}