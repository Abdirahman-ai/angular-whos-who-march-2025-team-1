import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Category from './interfaces/Category';
import Difficulty from './interfaces/Difficulty';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  private numberOfQuestionsSource = new BehaviorSubject<number>(10);
  numberOfQuestions = this.numberOfQuestionsSource.asObservable();

  private selectedCategorySource = new BehaviorSubject<Category>({
    id: 9,
    name: 'General Knowledge',
  });
  selectedCategory = this.selectedCategorySource.asObservable();

  private selectedDifficultySource = new BehaviorSubject<Difficulty>('easy');
  selectedDifficulty = this.selectedDifficultySource.asObservable();

  setNumberOfQuestions(numQuestions: number) {
    this.numberOfQuestionsSource.next(numQuestions);
  }

  setSelectedCategory(category: Category) {
    this.selectedCategorySource.next(category);
  }

  setSelectedDifficulty(Difficulty: Difficulty) {
    this.selectedDifficultySource.next(Difficulty);
  }
}
