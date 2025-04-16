import { Component, OnInit } from '@angular/core';
import Category from '../../../interfaces/Category';
import { AppService } from '../../../App.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectComponent } from '../common/select/select.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, SelectComponent, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  categories: Category[] = [];

  welcomeForm = new FormGroup({
    numQuestions: new FormControl(10, [Validators.required]),
    selectedCategory: new FormControl<Category | undefined>(undefined, [
      Validators.required,
    ]),
  });

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.fetchCategories();
    this.appService.availableCategories.subscribe(
      (currentAvailableCategories) =>
        (this.categories = currentAvailableCategories)
    );
  }

  onSubmit() {
    this.appService.setNumberOfQuestions(
      this.welcomeForm.controls['numQuestions'].value ?? 10
    );
    this.appService.setSelectedCategory(
      this.welcomeForm.controls['selectedCategory'].value ?? undefined
    );

    /* this.router.navigateByUrl('/play'); */
  }
}
