import { Component } from '@angular/core';
import { ListCharactersComponent } from './list-characters/list-characters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListCharactersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(){}

  ngOnInit() {
  }
}
