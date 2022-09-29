import { NgIfContext } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { differenceInSeconds } from 'date-fns';
import { formatDuration, intervalToDuration } from 'date-fns';
import { EventStorage } from './eventStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'countdown-app';
  eventTime = '2022-10-26';
  eventTitle: string;
  timeLeft$: Observable<Duration>;
  eventStorage: EventStorage;

  constructor() {
    this.timeLeft$ = timer(0, 1000).pipe(
      map(() =>
        intervalToDuration({
          start: Date.parse(this.eventTime),
          end: Date.now(),
        })
      )
    );
    this.eventStorage = new EventStorage();
    this.eventTitle = this.eventStorage.getData('eventTitle') || 'Your event';
  }

  formatTime({
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  }: Duration): string {
    let formattedTime = '';
    formattedTime += this.formatTimePart('year', years);
    formattedTime += this.formatTimePart('month', months);
    formattedTime += this.formatTimePart('day', days);
    formattedTime += `${hours}h, ${minutes}m, ${seconds}s`;

    return formattedTime;
  }

  private formatTimePart(name: string, value: number | undefined): string {
    if (value) {
      return `${value} ${name}${value > 1 ? 's' : ''}, `;
    }
    return '';
  }
}
