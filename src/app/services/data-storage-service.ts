import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../models/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as RecipesActions from '../recipes/store/recipe.actions'

@Injectable({
    providedIn:'root'
})
export class DataStorageService{

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService, private store: Store<fromApp.AppState>){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-shopping-recipe-book-aafbd-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-shopping-recipe-book-aafbd-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap(recipes => {
            //this.recipeService.setRecipes(recipes);
            this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        }));
    }
}