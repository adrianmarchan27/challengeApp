import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Hero, Publisher } from '../interfaces/hero.interface';
import { HeroesService } from '../services/heroes.service';
import { AddHero, DeleteHero, GetHeroById, GetHeroes, UpdateHero } from './hero.actions';

export interface HeroListStateModel {
  heroes: Hero[];
  selectedHero: Hero;
}

@State<HeroListStateModel>({
  name: 'heroes',
  defaults: {
    heroes: [],
    selectedHero: {
      superHero: '',
      alterEgo: '',
      characters: [],
      firstAppearance: '',
      publisher: Publisher.DCComics,
      altImg: '',
    },
  },
})
@Injectable()
export class HeroListState {
  constructor(private heroesServices: HeroesService) {}

  @Selector()
  public static getHeroesList({ heroes }: HeroListStateModel): Hero[] {
    return heroes;
  }

  @Selector()
  public static getSelectedHero({ selectedHero }: HeroListStateModel): Hero {
    return selectedHero;
  }

  @Action(AddHero)
  addBook(
    { getState, patchState }: StateContext<HeroListStateModel>,
    { hero }: AddHero
  ): Observable<Hero> {
    return this.heroesServices.addHero(hero).pipe(
      tap((hero: Hero) => {
        const state = getState();
        patchState({ selectedHero: hero });
      })
    );
  }

  @Action(GetHeroes)
  getHeroes({
    getState,
    setState,
  }: StateContext<HeroListStateModel>): Observable<Hero[]> {
    console.log('getHeroes');
    return this.heroesServices.getHeroes().pipe(
      tap((heroes: Hero[]) => {
        const state = getState();
        setState({ ...state, heroes });
      })
    );
  }

  @Action(GetHeroById)
  getHeroById(
    { getState, patchState }: StateContext<HeroListStateModel>,
    { id }: GetHeroById
  ): Observable<Hero> {
    return this.heroesServices.getHeroById(id).pipe(
      tap((hero: Hero) => {
        const state = getState();
        patchState({ selectedHero: hero });
      })
    );
  }

  @Action(UpdateHero)
  updateHero(
    { getState, patchState }: StateContext<HeroListStateModel>,
    { hero }: UpdateHero
  ): Observable<Hero> {
    return this.heroesServices.updateHero(hero).pipe(
      tap((hero: Hero) => {
        const state = getState();
        patchState({ selectedHero: hero });
      })
    );
  }

  @Action(DeleteHero)
  deleteHero(
    {getState}: StateContext<HeroListStateModel>,
    {id}: DeleteHero
  ): Observable<void> {
    return this.heroesServices.deleteHero(id).pipe(
        tap(() => {
            const state = getState();
        })
    );
  }
}
