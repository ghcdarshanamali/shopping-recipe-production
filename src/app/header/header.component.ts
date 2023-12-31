import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../services/data-storage-service";
import { AuthService } from "../services/auth-service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{

    isAuthenticated =false;
    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}
    
/* @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature:string){
        this.featureSelected.emit(feature);
    } */
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe( user => {
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
        this.authService.logout();
    }
}