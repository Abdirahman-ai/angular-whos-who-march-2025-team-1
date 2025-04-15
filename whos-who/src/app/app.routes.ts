import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PlayComponent } from './components/play/play.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'menu', component: MenuComponent }, 
  { path: 'results', component: ResultsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
];
