import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "../services/auth-service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../common/alert/alert.component";
import { PlaceholderDirective } from "../common/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{

    isLoginMode = true;
    isLoading = false;
    errorMessage : string = null;

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    private closeSub : Subscription;
    constructor(private authService: AuthService, private router: Router, private componentFactory: ComponentFactoryResolver){}
    
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
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        } 
        });

       form.reset();
    }

    onHandleError(){
        this.errorMessage = null;
    }
   private showErrorAlert(message: string){

    //const alertComp = new AlertComponent();
    const alertCompFactory = this.componentFactory.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=> {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
    });
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}