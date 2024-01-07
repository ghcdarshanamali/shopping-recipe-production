import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from "./store/shopping-list.actions";
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients : Observable<{ingredients: Ingredient[]}> ;
  private igChangeSub: Subscription;
 
  constructor(private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>){}
  
  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
   /*  this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientChange.subscribe(
      (ingredients : Ingredient[]) =>{
        this.ingredients = ingredients;
      }); */
  }
  
  /* onIngredeinetAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  } */

  onEditItem(index: number){
   // this.shoppingListService.startedEditing.next(index);
   this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
