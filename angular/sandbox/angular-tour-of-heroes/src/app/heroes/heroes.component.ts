// https://angular.io/tutorial/toh-pt1
// 
// $ ng generate component heroes
// .. src/app/heroes/
// .. HeroesComponent/{4 files}


import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';

// About @Component
// decorator function
// hosts ng metadata: 
// app-heroes/../selector (css) == heroes.components.html
// templateUrl >> this file is a template & where it can be found 
// styleUrls >> private css location

@Component( {
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
} )
export class HeroesComponent implements OnInit
{

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  // title = 'Windstorm';

  constructor () { }

  ngOnInit() { }

}
