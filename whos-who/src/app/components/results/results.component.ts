import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { CircularProgressComponent } from '../common/circular-progress/circular-progress.component';
import { AppService } from '../../../App.service'; // Import AppService

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, CircularProgressComponent],
})
export class ResultsComponent implements OnInit {
  correctAnswers: number = 0;  // Will be dynamically updated from AppService
  totalQuestions: number = 10;  // Total number of questions, can be dynamically set as well
  playerName = '';
  progress: number = 0;

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    // Get the score from AppService
    this.correctAnswers = this.appService.getScore();  // Get the score from AppService
    this.progress = (this.correctAnswers / this.totalQuestions) * 100;  // Update progress based on score
  }

  submitScore() {
    if (this.playerName.trim() === '') {
      alert('Please enter your name!');
      return;
    }

    // Get existing leaderboard or initialize an empty array
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');

    // Add the player's score to the leaderboard
    leaderboard.push({ name: this.playerName, score: this.correctAnswers });

    // Sort leaderboard by score in descending order
    leaderboard.sort((a: any, b: any) => b.score - a.score);

    // Save the updated leaderboard to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Navigate to leaderboard page
    this.router.navigate(['/leaderboard']);
  }
}
