import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  standalone: true, // Ensure this is defined for standalone component
  imports: [CommonModule],
})
export class LeaderboardComponent {
  leaderboard: { name: string; score: number }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Load leaderboard from localStorage
    const storedLeaderboard = JSON.parse(
      localStorage.getItem('leaderboard') || '[]'
    );

    // Only keep the top 10 scores
    this.leaderboard = storedLeaderboard.slice(0, 10);
  }

  playAgain() {
    // Navigate to the game page to play again
    this.router.navigate(['/play']);
  }
}
