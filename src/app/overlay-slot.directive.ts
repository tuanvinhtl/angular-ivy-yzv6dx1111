import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import moment from 'moment';

@Directive({ selector: '[appRender]' })
export class OverlaySlotDirective implements AfterViewInit {
  offsetWidthTimeSlots = 72;
  @Input()
  set range(value) {
    if (!value.totalTime) return;
    const totalTime = value.totalTime;
    const widthTotalPos = this.elementRef.nativeElement.offsetWidth;
    const scale = this.offsetWidthTimeSlots / (24 * 3600);

    value.booking.order.forEach((order) => {
      // take a look caculate the translation x value
      // caculate the width of the box related to time range
      const timeDuring =
        moment(order.end_tine).unix() - moment(order.start_time).unix();
      const posStart =
        moment(order.start_time).unix() - moment(value.start).unix();
      const ran = posStart * scale + this.offsetWidthTimeSlots;
      const ranWidth = timeDuring * scale;
      const child = this.document.createElement('div');
      child.className = 'overlay-slot';

      const cssText = `width: ${ranWidth}px; transform: translateX(${ran}px);`;
      child.style.cssText = cssText;
      this.renderer.appendChild(this.elementRef.nativeElement, child);
      console.log(scale)
    });
  }
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngAfterViewInit(): void {
    // console.log(this.elementRef.nativeElement.offsetWidth);
   
    // 
  }
}
