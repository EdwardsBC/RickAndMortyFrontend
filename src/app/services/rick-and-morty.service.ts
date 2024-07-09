import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RickAndMortyCharacterResponse } from '../models/rick-and-morty-character-response.model';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<RickAndMortyCharacterResponse> {
    return this.http.get<RickAndMortyCharacterResponse>(`${this.API_URL}/characters`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.API_URL}/characters/${id}`);
  }
}
