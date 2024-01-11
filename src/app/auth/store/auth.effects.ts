import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

export interface AuthResponseData{

    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : boolean;
}

const handledAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000); 
    const user = new User(email, userId, token, expireDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({email: email, userId: userId, token: token, expirationDate: expireDate})

};

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occcured!';
    if(!errorRes.error || !errorRes.error.error){
        return of(new AuthActions.LoginFail(errorMessage));
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
    return of(new AuthActions.LoginFail(errorMessage));
}
@Injectable()
export class AuthEffects {
    
    authSignup = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
            {   email:signupAction.payload.email,
                password: signupAction.payload.email,
                returnSecureToken: true })
                .pipe(map(resData => {
                   return handledAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)}), 
                    catchError(errorRes => {
                 return  handleError(errorRes);
                }));
        }
        )
    ));

    authLogin = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.LOGIN_START),
    switchMap((authData:  AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
        {   email:authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
        }).pipe(tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
           map(resData => {
            return handledAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)}), 
            catchError(errorRes => {
         return  handleError(errorRes);
        }));
}
)
));

authSuccess = createEffect(() => this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), tap(() => {
        this.router.navigate(['/']);
})), { dispatch: false });

authLogout = createEffect(() => this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_FAIL),
tap(() => {
    this.authService.clearLogoutTimer();
    localStorage.removeItem('userData');
    this.router.navigate(['/login'])
})), { dispatch: false });

autoLogin = createEffect(() => this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN),
    map(() => {
        const userData : {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
           } =  JSON.parse(localStorage.getItem('userData'));
        
           if(!userData){
            return {type: 'DUMMY'};
           }
           const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        
           if(loadedUser.token){
           // this.user.next(loadedUser);
           const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
           new Date().getTime();
           this.authService.setLogoutTimer(expirationDuration);
           return new AuthActions.AuthenticateSuccess({email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)});
           
            //this.autoLogout(expirationDuration); 
           }
           return {type: 'DUMMY'}
    })));

constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService){

    }
}