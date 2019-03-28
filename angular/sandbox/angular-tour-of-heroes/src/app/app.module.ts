// ✅  https://angular.io/tutorial/toh-pt1

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// NgModel Doc
import { FormsModule } from '@angular/forms';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';


@NgModule( {
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }

