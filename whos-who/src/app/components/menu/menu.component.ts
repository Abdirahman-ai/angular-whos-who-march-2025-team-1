import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SelectComponent } from '../common/select/select.component';
import Difficulty from '../../../interfaces/Difficulty';
import { ToggleComponent } from '../common/toggle/toggle.component';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, CommonModule, SelectComponent, ToggleComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isOpen: boolean = false;
  difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];
  musicIsOn: boolean = false;
  soundEffectsAreOn: boolean = false;
  constructor() {}

  ngOnInit() {}

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
