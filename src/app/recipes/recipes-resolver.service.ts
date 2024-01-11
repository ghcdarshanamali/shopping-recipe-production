import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../models/recipe.model";
import { Observable, map, of, switchMap, take } from "rxjs";
import { DataStorageService } from "../services/data-storage-service";
import { RecipeService } from "../services/recipe.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from "../recipes/store/recipe.actions";
import { Actions, ofType } from "@ngrx/effects";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService{
 
 constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService,
     private store: Store<fromApp.AppState>, private actions$: Actions){

 }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Recipe[]> | Promise<Recipe[]>  | Recipe[]{
        const recipes = this.recipeService.getRecipes();

        if(recipes.length == 0){
          //  return this.dataStorageService.fetchRecipes();
          return this.store.select('recipes').pipe(
            take(1), map(recipeState => {
            return recipeState.recipes;
          }),
          switchMap(recipes => {
            if(recipes.length === 0){
                this.store.dispatch(new RecipeActions.FetchRecipes());
                return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
            }else{
                return of(recipes);
            }
          }));
         
        }else{
            return recipes;
        }
       
    } 

}

/* export const RecipesResolverServiceTemp : ResolveFn<Recipe> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Recipe[]> | Promise<Recipe[]>  | Recipe[] => {

    return inject(RecipesResolverService).resolve(route, state);
} */