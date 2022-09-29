import { NgIfContext } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { interval, Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { differenceInSeconds } from "date-fns"
import {  formatDuration, intervalToDuration } from 'date-fns'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'countdown-app';
  eventTitle = "Your event"
  eventTime = '2022-10-26'
  
  constructor() {
    this.timeLeft$ = interval(1000).pipe(
      map(x => formatDuration(intervalToDuration({ start: Date.parse(this.eventTime), end: Date.now() }))),
      shareReplay(1)
    );
  }

  public timeLeft$: any;
}
