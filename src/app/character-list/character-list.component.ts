import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Character } from '../models/character.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  searchTerm: string = '';
  error: string = '';

  constructor(private characterService: CharacterService, private router: Router) { }

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((data: Character[]) => {
      this.characters = data;
      this.filteredCharacters = data;
    }, (error) => {
      this.error = 'Error loading characters. Please try again later.';
    });
  }

  filterCharacters(): void {
    if (this.searchTerm === '') {
      this.filteredCharacters = this.characters;
    } else {
      this.filteredCharacters = this.characters.filter(character =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  goToDetails(characterId: number): void {
    this.router.navigate(['/characters', characterId]);
  }
}
