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
  pageSize: number = 10; // Número de elementos por página
  currentPage: number = 1; // Página actual
  pageNumbers: number[] = [];
  totalPages: number = 9;

  constructor(private http: HttpClient, private imgCharacterService: ImgCharacterService) {
    //this.pageNumbers = Array.from({length: 9}, (_, i) => i + 1)
    //console.log(this.pageNumbers);
  }

  ngOnInit() {
    this.calculatePageNumbers();
    this.getPeople(this.currentPage);
  }

  getPeople(page:number) {
    this.imgCharacterService.getData(page).subscribe(
      link => {
        this.people = link;
        this.isLoading = false;
      }
    );
}


calculatePageNumbers(): void {
  const totalPagesToShow = 3; // Número total de páginas a mostrar
  const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
  console.log(this.currentPage);
  const startPage = Math.max(2, (this.currentPage <= 5 ? this.currentPage - halfTotalPagesToShow : 5) );
  const endPage = Math.min(this.totalPages - 1, startPage + totalPagesToShow);

  console.log("TP: ", totalPagesToShow);
  console.log("HTP: ", halfTotalPagesToShow);
  console.log("startPage: ", startPage);
  console.log("endPage: ", endPage);

  this.pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);


}



// Método para avanzar a la siguiente página
previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.calculatePageNumbers();
    this.getPeople(this.currentPage);
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.calculatePageNumbers();
    this.getPeople(this.currentPage);
  }
}



// Método para determinar si hay una página anterior
hasPreviousPage(): boolean {
  return this.currentPage > 1;
}

// Método para determinar si hay una página siguiente
hasNextPage(): boolean {
    return this.currentPage < 9;
  
}

// Método para obtener los datos de la página actual
getCurrentPageData(): any[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.people ? this.people.slice(startIndex, startIndex + this.pageSize) : [];
}

goToPage(pageNumber:number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.calculatePageNumbers();
      this.getPeople(pageNumber);
    }
  }
}
