import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscribable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
/* @ViewChild('nameInput') nameInput: ElementRef;
@ViewChild('amountInput') amountInput: ElementRef; */
//@Output() ingredeinetAdded = new EventEmitter<Ingredient>();
@ViewChild('f') slForm: NgForm;
subscription: Subscription;
editMode = false;
editedItemIndex : number;
editedItem: Ingredient;

constructor(private shoppingListService: ShoppingListService){}
  
ngOnInit(): void {
   this.subscription = this.shoppingListService.startedEditing.subscribe(
    (index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }
 
submitShoppingList(form:NgForm){
   // this.ingredeinetAdded.emit(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
   //this.shoppingListService.addIngredient(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
  if(this.editMode){
    this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(form.value.name, form.value.amount));
  }else{
    this.shoppingListService.addIngredient(new Ingredient(form.value.name, form.value.amount));
  }
  this.clearForm();
  }
  clearForm(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.clearForm();

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
