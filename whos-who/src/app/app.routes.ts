import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PlayComponent } from './components/play/play.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'play', component: PlayComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
];
