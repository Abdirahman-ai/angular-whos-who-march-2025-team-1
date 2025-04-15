import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]  // Add CommonModule here for ngStyle and other directives
})
export class ResultsComponent {
  correctAnswers = 8;  // This will be dynamically updated from the game component
  totalQuestions = 10; // This will also be dynamically updated
  playerName = '';
  progress: number = (this.correctAnswers / this.totalQuestions) * 360;  // Progress based on score

  constructor(private router: Router) {}

  submitScore() {
    if (this.playerName.trim() === '') {
      alert('Please enter your name!');
      return;
    }

    let leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push({ name: this.playerName, score: this.correctAnswers });
    leaderboard.sort((a: any, b: any) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    this.router.navigate(['/leaderboard']);
  }
}
