import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
//@Output() selectedRecipe = new EventEmitter<Recipe>();

recipes: Recipe[];
subscription: Subscription;

constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>){}

ngOnInit(){
  // this.subscription = this.recipeService.recipesChanged
  this.subscription = this.store.select('recipes').pipe(
    map(recipeState => recipeState.recipes))
  .subscribe(
    (recipes:Recipe[]) => {
      this.recipes = recipes});
this.recipes = this.recipeService.getRecipes();
}

  /* getSelectedRecipe(recipeItem: Recipe){
    this.selectedRecipe.emit(recipeItem);
  } */

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo : this.route});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
