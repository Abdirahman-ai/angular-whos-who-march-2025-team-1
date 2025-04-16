import { Component, OnDestroy, OnInit } from '@angular/core';
import { CircularProgressComponent } from '../common/circular-progress/circular-progress.component';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  imports: [CircularProgressComponent],
})
export class PlayComponent implements OnInit, OnDestroy {
  timeLeft: number = 10;
  percentTime: number = this.timeLeft * 10;
  private intervalSubscription?: Subscription;

  constructor() {}

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    this.stopCountdown();
  }

  startCountdown() {
    this.intervalSubscription = interval(1000)
      .pipe(take(11))
      .subscribe(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.percentTime = this.timeLeft * 10;
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
}
