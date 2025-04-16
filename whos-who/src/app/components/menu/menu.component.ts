import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SelectComponent } from '../common/select/select.component';
import Difficulty from '../../../interfaces/Difficulty';
import { ToggleComponent } from '../common/toggle/toggle.component';
import { AppService } from '../../../App.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    CommonModule,
    SelectComponent,
    ToggleComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isOpen: boolean = false;
  difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];

  settingsForm = new FormGroup({
    selectedDifficulty: new FormControl<Difficulty>('easy', [
      Validators.required,
    ]),
    musicIsOn: new FormControl<boolean>(false, []),
    soundEffectsAreOn: new FormControl<boolean>(false, []),
  });

  constructor(private appService: AppService) {}

  ngOnInit() {}

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }

  onSubmit() {
    this.appService.setSelectedDifficulty(
      this.settingsForm.controls['selectedDifficulty'].value ?? 'easy'
    );
    this.appService.setBackgroundMusicOn(
      this.settingsForm.controls['musicIsOn'].value ?? false
    );
    this.appService.setSoundEffectsOn(
      this.settingsForm.controls['soundEffectsAreOn'].value ?? false
    );

    console.log(this.appService.selectedDifficulty);
    console.log(this.appService.backgroundMusicOn);
    console.log(this.appService.soundEffectsOn);
  }
}
