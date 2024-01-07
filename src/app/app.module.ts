import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonsModule } from './common/commons.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { shopingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonsModule,
    CoreModule,
    StoreModule.forRoot({shoppingList: shopingListReducer}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
