import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RecipesActions from './recipe.actions';
import { map, switchMap, withLatestFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "src/app/models/recipe.model";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "src/app/store/app.reducer";

@Injectable()
export class RecipeEffects{

    fetchRecipes = createEffect(() =>  this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
        return this.http.get<Recipe[]>('https://ng-shopping-recipe-book-aafbd-default-rtdb.firebaseio.com/recipes.json')
    }),
    map(recipes => {
        return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
    }),
    map(recipes=> {
        return new RecipesActions.SetRecipes(recipes);
    })
    ));

    storeRecipes = createEffect(() =>  this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
        return this.http.put('https://ng-shopping-recipe-book-aafbd-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes);
    }),), {dispatch : false});


    constructor(private http: HttpClient,private actions$: Actions, private store: Store<fromApp.AppState>){}
}