import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
recipesChanged = new Subject<Recipe[]>();
  constructor(private shoppingListService: ShoppingListService){}

   /* recipeSelected = new EventEmitter<Recipe>(); */
   
   /* private recipes: Recipe[] =[
        new Recipe('Burger','This is a Burger','https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',[new Ingredient('Buns',2), new Ingredient('Meat',1)]),
        new Recipe('Pizza','This is a Pizza','https://www.twopeasandtheirpod.com/wp-content/uploads/2021/03/Veggie-Pizza-8-500x375.jpg',[new Ingredient('Flour',2), new Ingredient('Cheese',1)]),
        new Recipe('Taco', 'This is a Taco','https://img.taste.com.au/w_-0kcUJ/taste/2016/11/aussie-style-beef-and-salad-tacos-86525-1.jpeg',[new Ingredient('Cheese',2), new Ingredient('Meat',1)])
      ]; */

      private recipes: Recipe[] =[];
      getRecipes(){
        return this.recipes.slice();
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
      }
      getRecipe(id:number){
        return this.recipes[id];
      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number, recipe:Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
}