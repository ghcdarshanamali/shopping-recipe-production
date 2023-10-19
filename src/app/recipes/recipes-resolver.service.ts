import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../models/recipe.model";
import { Observable } from "rxjs";
import { DataStorageService } from "../services/data-storage-service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{
 
 constructor(private dataStorageService: DataStorageService){

 }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        throw new Error("Method not implemented.");
    }

}