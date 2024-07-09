import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { Character } from '../models/character.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CharacterDetailComponent implements OnInit {
  character: Character | undefined;
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rickAndMortyService: RickAndMortyService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCharacter(+id);
    }
  }

  getCharacter(id: number): void {
    this.rickAndMortyService.getCharacterById(id).subscribe({
      next: (character) => {
        this.character = character;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  searchCharacter(): void {
    if (this.searchTerm) {
      const id = +this.searchTerm;
      this.getCharacter(id);
    }
  }

  downloadPDF(): void {
    const element = document.getElementById('character-card');
    if (element) {
      html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const margin = 20;
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const pdfHeight = (pdfWidth * canvas.height) / canvas.width;

        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);
        pdf.save(`${this.character?.name}.pdf`);
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }
}
