import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
//@Input() recipe: Recipe;
recipe: Recipe;
id: number;
constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>){}
  
ngOnInit(): void {
   this.route.params.pipe(
    map(params => {
      return +params['id'];
    }),switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }), map(recipeState => {
      return recipeState.recipes.find((recipe, index) => {
        return index === this.id;
      });})).subscribe( recipe => {
         this.recipe = recipe;
   });
  }

onAddToShoppingList(){
this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
}
onEditRecipe(){
  this.router.navigate(['edit'], {relativeTo: this.route});
  //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
}
onDeleteRecipe(){
 // this.recipeService.deleteRecipe(this.id);
this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
  this.router.navigate(['/recipes']);
}
}
