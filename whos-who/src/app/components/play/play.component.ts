import { Component, OnInit, OnDestroy } from '@angular/core';
import { CircularProgressComponent } from '../common/circular-progress/circular-progress.component';
import { interval, Subscription, take } from 'rxjs';
import { AppService } from '../../../App.service';
import { Router } from '@angular/router';
import { Question } from '../../../interfaces/Question';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  imports: [CircularProgressComponent, CommonModule],
})
export class PlayComponent implements OnInit, OnDestroy {
  timeLeft: number = 30;  
  percentTime: number = (this.timeLeft / 30) * 100;  
  private intervalSubscription?: Subscription;
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  isGameOver: boolean = false;

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    const selectedCategory = this.appService.getSelectedCategorySource();
    const numberOfQuestions = this.appService.getNumberOfQuestions();
    this.fetchQuestions(selectedCategory?.id ?? 9, numberOfQuestions);
    this.startCountdown();  
  }

  ngOnDestroy(): void {
    this.stopCountdown();  
  }

  startCountdown() {
    this.intervalSubscription = interval(1000)
      .pipe(take(31))  
      .subscribe(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.percentTime = (this.timeLeft / 30) * 100; 
        } else {
          this.stopCountdown();
        }
      });
  }

  stopCountdown() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  // Fetch trivia questions from the API
  async fetchQuestions(categoryId: number, numQuestions: number) {
    const apiUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryId}&type=multiple`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.questions = data.results.map((item: any) => ({
        category: item.category,
        type: item.type,
        difficulty: item.difficulty,
        question: item.question,
        correct_answer: item.correct_answer,
        incorrect_answers: item.incorrect_answers,
        all_answers: [
          item.correct_answer,
          ...item.incorrect_answers,
        ].sort(() => Math.random() - 0.5),
      }));
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
    }
  }

  // Handle user's answer
  answerQuestion(selectedAnswer: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      this.score++;
    }
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.isGameOver = true;
    }
  }

  // Restart the game
  restartGame() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.isGameOver = false;
    const selectedCategory = this.appService.getSelectedCategorySource();
    const numberOfQuestions = this.appService.getNumberOfQuestions();
    this.fetchQuestions(selectedCategory?.id ?? 9, numberOfQuestions); 
    this.startCountdown(); 
  }

  // Navigate to the results page
  goToResults() {
    this.appService.setScore(this.score);
    this.router.navigateByUrl('/results');
  }
}
