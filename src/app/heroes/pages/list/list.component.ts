import { Component, OnInit } from '@angular/core';
// import { Select, Store } from '@ngxs/store';
// import { Observable } from 'rxjs';

import { Hero } from '../../interfaces/hero.interface';
// import { GetHeroes } from '../../state/hero.actions';
// import { HeroListState } from '../../state/hero.state';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ],
})
export class ListComponent implements OnInit {
  public heroes: Hero[] = [];
  // @Select(HeroListState.getHeroesList) heroes$: Observable<Hero[]>;

  constructor(
    private heroesService: HeroesService, 
    // private store: Store
    ) {}

  ngOnInit(): void {
    
    //Try to run NGXS
    // this.store.dispatch(new GetHeroes());
    this.heroesService
      .getHeroes()
      .subscribe((heroes) => {
        (this.heroes = heroes)});
  }
}
