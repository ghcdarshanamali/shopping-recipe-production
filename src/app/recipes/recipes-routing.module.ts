import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { IsAuthGuard } from "../auth/auth.guard";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const routes: Routes = [
    {path: '', component: RecipesComponent, 
        canActivate: [IsAuthGuard], children: [
        {path: '', component: RecipesStartComponent},
        {path: 'new', component: RecipesEditComponent},
        {path: ':id', component: RecipeDetailComponent},//, resolve: [RecipesResolverService]
        {path: ':id/edit', component: RecipesEditComponent}, //, resolve: [RecipesResolverService]
    ]},
    
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{

}