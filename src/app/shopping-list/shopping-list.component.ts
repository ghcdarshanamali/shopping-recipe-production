import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients : Ingredient[];
  private igChangeSub: Subscription;
 
  constructor(private shoppingListService: ShoppingListService){}
  
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientChange.subscribe(
      (ingredients : Ingredient[]) =>{
        this.ingredients = ingredients;
      });
  }
  /* onIngredeinetAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  } */

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
