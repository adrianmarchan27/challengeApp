import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  public heroes: Hero[] = [];
  public search: FormControl = new FormControl('');
  public heroSelected!: Hero | undefined;
  // Gets the superheroes of the service when the person stops to type
  // debouncer: Subject<string> = new Subject();

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    // Gets the superheroes of the service when the person stops to type
    // this.debouncer
    //   .pipe(debounceTime(300))
    //   .subscribe((suggest: string) =>
    //     this.heroesService
    //       .getSuggestion(suggest.trim())
    //       .subscribe((heroes) => (this.heroes = heroes))
    //   );
  }

  searching() {
    // Gets the superheroes of the service when the person stops to type
    // this.debouncer.next(this.search.value);
    this.heroesService
      .getSuggestion(this.search.value.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroSelected = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.search.setValue(hero.superHero);
    this.heroesService
      .getHeroById(hero.id!)
      .subscribe((hero) => (this.heroSelected = hero));
  }
}
