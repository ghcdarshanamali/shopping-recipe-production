import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropDownDirective } from "../directives/drop-down.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropDownDirective,
    ],
imports: [
    CommonModule
],
exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropDownDirective,
    CommonModule
]
})
export class CommonsModule{

}