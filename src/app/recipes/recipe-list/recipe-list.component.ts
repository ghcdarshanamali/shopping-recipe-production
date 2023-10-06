import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
//@Output() selectedRecipe = new EventEmitter<Recipe>();

recipes: Recipe[];
subscription: Subscription;

constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}

ngOnInit(){
  this.subscription = this.recipeService.recipesChanged.subscribe(
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
