import { Component } from '@angular/core'
import { Observable, timer } from 'rxjs'
import { map } from 'rxjs/operators'
import { intervalToDuration } from 'date-fns'
import { EventStorage } from './eventStorage'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  eventTime: string
  eventTitle: string
  timeLeft$: Observable<Duration>
  eventStorage: EventStorage
  error: Error
  date: Date

  constructor() {
    this.timeLeft$ = timer(0, 1000).pipe(
      map(() =>
        intervalToDuration({
          start: Date.parse(this.eventTime),
          end: Date.now(),
        }),
      ),
    )
    this.eventStorage = new EventStorage()
    this.eventTitle = this.eventStorage.getData('eventTitle') || 'Midsummer Eve'
    this.eventTime = this.eventStorage.getData('eventTime') || '2023-06-23'
    this.date = new Date()
  }

  onEventTitleChange(newTitle: string) {
    this.eventTitle = newTitle
    this.eventStorage.saveData('eventTitle', newTitle)
  }

  onEventTimeChange(newTime: string) {
    this.eventTime = newTime
    this.eventStorage.saveData('eventTime', newTime)
  }

  formatTime({
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  }: Duration): string {
    let formattedTime = ''
    formattedTime += this.formatTimePart('year', years)
    formattedTime += this.formatTimePart('month', months)
    formattedTime += this.formatTimePart('day', days)
    formattedTime += `${hours}h, ${minutes}m, ${seconds}s`

    return formattedTime
  }

  private formatTimePart(name: string, value: number | undefined): string {
    if (value) {
      return `${value} ${name}${value > 1 ? 's' : ''}, `
    }
    return ''
  }
}
