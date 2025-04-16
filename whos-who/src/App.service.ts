import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Category from './interfaces/Category';
import Difficulty from './interfaces/Difficulty';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

const triviaApiUrl = 'https://opentdb.com';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  private numberOfQuestionsSource = new BehaviorSubject<number>(10);
  numberOfQuestions = this.numberOfQuestionsSource.asObservable();

  private selectedCategorySource = new BehaviorSubject<Category | undefined>({
    id: 9,
    name: 'General Knowledge',
  });
  selectedCategory = this.selectedCategorySource.asObservable();

  private availableCategoriesSource = new BehaviorSubject<Category[]>([]);
  availableCategories = this.availableCategoriesSource.asObservable();

  private selectedDifficultySource = new BehaviorSubject<Difficulty>('easy');
  selectedDifficulty = this.selectedDifficultySource.asObservable();

  private backgroundMusicOnSource = new BehaviorSubject<boolean>(false);
  backgroundMusicOn = this.backgroundMusicOnSource.asObservable();

  private soundEffectsOnSource = new BehaviorSubject<boolean>(false);
  soundEffectsOn = this.soundEffectsOnSource.asObservable();

  setNumberOfQuestions(numQuestions: number) {
    this.numberOfQuestionsSource.next(numQuestions);
  }

  setSelectedCategory(category: Category | undefined) {
    this.selectedCategorySource.next(category);
  }

  setAvailableCategories(categories: Category[]) {
    this.availableCategoriesSource.next(categories);
  }

  setSelectedDifficulty(Difficulty: Difficulty) {
    this.selectedDifficultySource.next(Difficulty);
  }

  setBackgroundMusicOn(isOn: boolean) {
    this.backgroundMusicOnSource.next(isOn);
  }

  setSoundEffectsOn(isOn: boolean) {
    this.soundEffectsOnSource.next(isOn);
  }

  async fetchCategories() {
    try {
      const data = await lastValueFrom(
        this.http.get<{ trivia_categories: Category[] }>(
          triviaApiUrl + '/api_category.php'
        )
      );
      this.setAvailableCategories(data.trivia_categories);
    } catch (error) {
      console.log(error);
      this.setAvailableCategories([]);
    } finally {
    }
  }
}
