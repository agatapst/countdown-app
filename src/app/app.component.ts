import { NgIfContext } from '@angular/common';
import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Observable, timer } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { differenceInSeconds } from "date-fns"
import {  formatDuration, intervalToDuration } from 'date-fns'
import { EventStorage } from './eventStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements AfterViewInit {
  @ViewChild('header') header: ElementRef<HTMLHeadingElement>;
  @ViewChild('subheader') subheader: ElementRef<HTMLHeadingElement>;

  title = 'countdown-app';
  eventTime = '2022-10-26';
  eventTitleFontSize: number = 8;
  eventSubtitleFontSize: number = 12;
  eventTitle: string
  timeLeft$: Observable<Duration>;
  eventStorage: EventStorage;
  
  constructor() {
    this.timeLeft$ = timer(0, 1000).pipe(
      map(() => intervalToDuration({ start: Date.parse(this.eventTime), end: Date.now() }))
    );
    this.eventStorage = new EventStorage();
    this.eventTitle = this.eventStorage.getData('eventTitle') || "Your event";
  }

  ngAfterViewInit() {
    this.fitText(this.header.nativeElement);
  }

  onTitleChange(newTitle: string) {
    this.eventTitle = newTitle;
    setTimeout(() => this.fitText(this.header.nativeElement), 10);
    this.eventStorage.saveData('eventTitle', newTitle)
  }

  private fitText(element: HTMLElement) {
    const parentWidth = element.parentElement!.offsetWidth;
    const elementWidth = element.offsetWidth;
    this.eventTitleFontSize = this.eventTitleFontSize * (parentWidth / elementWidth);
  }
}

