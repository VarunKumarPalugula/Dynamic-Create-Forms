import { Injectable } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';

@Injectable({
  providedIn: 'root',
})
export class AutotimeoutService {
  constructor(private userIdle: UserIdleService) {}

  autoTimeOut() {
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe((count) => console.log(count));
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      sessionStorage.clear();
      location.reload();
    });
  }
}
