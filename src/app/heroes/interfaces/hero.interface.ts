export interface Hero {
  id?: string;
  superHero: string;
  publisher: Publisher;
  alterEgo: string;
  firstAppearance: string;
  characters: string[];
  altImg?: string;
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}
