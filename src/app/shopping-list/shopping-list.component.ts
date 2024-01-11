import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients : Observable<{ingredients: Ingredient[]}> ;
  private igChangeSub: Subscription;
 
  constructor(private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>){}
  
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
   // this.igChangeSub.unsubscribe();
  }
}
