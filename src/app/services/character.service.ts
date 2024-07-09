import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'http://localhost:8080/api/characters';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl).pipe(
      switchMap((characters: Character[]) => {
        const episodeRequests = characters.map(character =>
          this.http.get(character.episode[0]).pipe(
            map((episode: any) => ({
              ...character,
              firstEpisodeName: episode.name
            }))
          )
        );
        return forkJoin(episodeRequests);
      })
    );
  }
}
