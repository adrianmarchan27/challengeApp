import { Hero } from '../interfaces/hero.interface';

export class GetHeroes {
  static readonly type = '[HeroList] Get Heroes';
}

export class GetHeroById {
  static readonly type = '[HeroList] Get Hero By Id';
  constructor(public id: string) {}
}

export class AddHero {
  static readonly type = '[HeroList] Add Hero';
  constructor(public hero: Hero) {}
}

export class UpdateHero {
  static readonly type = '[HeroList] Update Hero';
  constructor(public hero: Hero) {}
}

export class DeleteHero {
  static readonly type = '[HeroList] Delete Hero';
  constructor(public id: string) {}
}
