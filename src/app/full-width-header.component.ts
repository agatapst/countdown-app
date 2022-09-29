import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'full-width-header',
  template: `
    <h1 [ngStyle]="{ 'font-size': headerFontSize + 'vw' }" #header>
      {{ text }}
    </h1>
  `,
  styles: [
    `
      :host {
        margin: 0 0;
        white-space: nowrap;
        width: 100%;
      }
      h1 {
        display: inline;
        max-width: 100%;
      }
    `,
  ],
})
export class FullWidthHeaderComponent implements AfterViewInit, OnChanges {
  @Input() text: string;
  @ViewChild('header') header: ElementRef<HTMLHeadingElement>;

  headerFontSize: number = 10;

  ngAfterViewInit(): void {
    this.fitText(this.header.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.header && changes['text'].currentValue) {
      setTimeout(() => this.fitText(this.header.nativeElement), 10);
    }
  }

  private fitText(element: HTMLElement) {
    const parentWidth = element.parentElement!.offsetWidth;
    const elementWidth = element.offsetWidth;
    this.headerFontSize = this.headerFontSize * (parentWidth / elementWidth);
  }
}
