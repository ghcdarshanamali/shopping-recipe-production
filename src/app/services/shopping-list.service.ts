import { EventEmitter, Output } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{

ingredientChange = new Subject<Ingredient[]>();
//ingredientChange = new EventEmitter<Ingredient[]>();
startedEditing = new Subject<number>();
private ingredients : Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

      getIngredients(){
        return this.ingredients.slice();
      }
      getIngredient(index:number){
        return this.ingredients[index];
      }
      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        /* this.ingredientChange.emit(this.ingredients.slice()); */
        this.ingredientChange.next(this.ingredients.slice());
      }
      addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        /* this.ingredientChange.emit(this.ingredients.slice()); */
        this.ingredientChange.next(this.ingredients.slice());
      }
      updateIngredient(index:number, newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChange.next(this.ingredients.slice());
      }
      deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientChange.next(this.ingredients.slice());
      }

}