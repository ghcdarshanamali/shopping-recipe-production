import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../services/data-storage-service";
import { AuthService } from "../services/auth.service";
import { Subscription, map } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{

    isAuthenticated =false;
    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService,  private store: Store<fromApp.AppState>){}
    
/* @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature:string){
        this.featureSelected.emit(feature);
    } */
    ngOnInit(): void {
        //this.userSub = this.authService.user.subscribe( user => {
        this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe( user => {
            this.isAuthenticated = !!user;
        });
    }
    onSaveData(){
        this.dataStorageService.storeRecipes();
    }
    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }
    ngOnDestroy(): void {
       this.userSub.unsubscribe();
    }
    onLogout(){
       // this.authService.logout();
       this.store.dispatch(new AuthActions.AuthenticateFail());
    }
}