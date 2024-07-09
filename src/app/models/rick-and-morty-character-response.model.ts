import { Character } from './character.model';

export interface RickAndMortyCharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
}
