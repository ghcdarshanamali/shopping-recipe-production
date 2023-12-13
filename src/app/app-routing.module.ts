import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipesStartComponent } from "./recipes/recipes-start/recipes-start.component";
import { RecipesEditComponent } from "./recipes/recipes-edit/recipes-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard, IsAuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, 
    canActivate: [IsAuthGuard], children: [
        {path: '', component: RecipesStartComponent},
        {path: 'new', component: RecipesEditComponent},
        {path: ':id', component: RecipeDetailComponent},//, resolve: [RecipesResolverService]
        {path: ':id/edit', component: RecipesEditComponent}, //, resolve: [RecipesResolverService]
    ]},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'login', component: AuthComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}