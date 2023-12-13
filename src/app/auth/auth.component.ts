import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "../services/auth-service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{

    isLoginMode = true;
    isLoading = false;
    errorMessage : string = null;

    constructor(private authService: AuthService, private router: Router){}
    
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){

        this.errorMessage = null; 
        this.isLoading = true;

        if(!form.valid){
            return
        }
        
        const email = form.value.email;
        const password = form.value.password;

        let authObservable : Observable<AuthResponseData>;
        
        if(this.isLoginMode){
            authObservable =  this.authService.login(email, password);
        }else{
            authObservable = this.authService.signup(email, password);
        }

       /*  authObservable.subscribe(() => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            this.errorMessage = errorMessage;
            this.isLoading = false;
        }); */

        authObservable.subscribe({
          
           next: () => {
            this.isLoading = false;
           this.router.navigate(['/recipes']);
        },
           error: errorMessage => {
            this.errorMessage = errorMessage;
            this.isLoading = false;
        } 
        });

       form.reset();
    }
}