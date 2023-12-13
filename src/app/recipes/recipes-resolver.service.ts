import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../models/recipe.model";
import { Observable } from "rxjs";
import { DataStorageService } from "../services/data-storage-service";
import { RecipeService } from "../services/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService{
 
 constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){

 }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Recipe[]> | Promise<Recipe[]>  | Recipe[]{
        const recipes = this.recipeService.getRecipes();

        if(recipes.length == 0){
            return this.dataStorageService.fetchRecipes();
        }else{
            return recipes;
        }
       
    } 

}

/* export const RecipesResolverServiceTemp : ResolveFn<Recipe> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Recipe[]> | Promise<Recipe[]>  | Recipe[] => {

    return inject(RecipesResolverService).resolve(route, state);
} */