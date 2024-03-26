import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})


export class CharacterComponent {
  imageLink: string | undefined;
  @Input() person = new Input();

  constructor(){}

  ngOnInit() {
  }
}
