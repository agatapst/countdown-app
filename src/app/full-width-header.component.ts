import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'full-width-header',
  template: `
    <h1
      *ngIf="!subheader"
      [ngStyle]="{ 'font-size': headerFontSize + 'vw' }"
      #header
    >
      {{ text }}
    </h1>
    <h2
      *ngIf="subheader"
      [ngStyle]="{
        'font-weight': 'normal',
        'font-size': headerFontSize + 'vw'
      }"
      #header
    >
      {{ text }}
    </h2>
  `,
  styles: [
    `
      :host {
        margin: 0 0;
        white-space: nowrap;
        width: 100%;
      }
      h1,
      h2 {
        display: inline;
      }
    `,
  ],
})
export class FullWidthHeaderComponent implements AfterViewInit, OnChanges {
  @Input() text: string
  @Input() subheader: boolean = false
  @ViewChild('header') header: ElementRef<HTMLHeadingElement>

  headerFontSize: number = 10

  ngAfterViewInit(): void {
    this.scheduleResizeHeader()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'].currentValue) {
      this.scheduleResizeHeader()
    }
  }

  private scheduleResizeHeader() {
    setTimeout(() => this.fitText(this.header.nativeElement), 0)
  }

  private fitText(element: HTMLElement) {
    const parentWidth = element.parentElement!.offsetWidth
    const elementWidth = element.offsetWidth
    this.headerFontSize = this.headerFontSize * (parentWidth / elementWidth)
  }
}
