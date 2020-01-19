import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  // selectedHero: Hero;

  //synchronuous...returns a list of Heros (Hero[]) instantly, or pretends the browser can wait (which it can't)
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  //async..  waits for the Observable to emit the array of heroes
  //The subscribe() method passes the emitted array (heroes) to the callback which sets the component heroes,
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  // onSelect(hero: Hero): void {
  //  this.selectedHero = hero;
  // }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

}
