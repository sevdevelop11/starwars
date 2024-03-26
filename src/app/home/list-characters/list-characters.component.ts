import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { CharacterComponent } from './character/character.component';
import { ImgCharacterService } from '../../shared/img-character/img-character.service';
import { StarWarsCharacter } from '../../interfaces/star-wars-character';

@Component({
  selector: 'app-list-characters',
  standalone: true,
  imports: [CommonModule, CharacterComponent],
  templateUrl: './list-characters.component.html',
  styleUrl: './list-characters.component.scss'
})
export class ListCharactersComponent {
  people: [StarWarsCharacter] | undefined;
  images: any;
  character: StarWarsCharacter | undefined;
  isLoading = true;
  constructor(private http: HttpClient, private imgCharacterService: ImgCharacterService) {}

  ngOnInit() {
    this.getPeople();
  }

  getImages() {
    this.imgCharacterService.loadImages().subscribe(
      link => {
        this.images = link;
      }
    ), (error: any) => {
      console.error('Error al buscar la imagen:', error);
    },() => {
      this.isLoading = false;
      console.log(this.isLoading);
      console.log(this.images);
    };
  }

  getPeople() {
    this.imgCharacterService.getData().subscribe(
      link => {
        this.people = link;
        this.isLoading = false;
      }
    );
}
}
