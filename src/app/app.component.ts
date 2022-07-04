import {
  Component,
  VERSION,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import moment from 'moment';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild('el') el: any;
  @ViewChild('el', { static: true }) el: ElementRef;
  @ViewChild('timeDelever', { static: true }) timeDelever: ElementRef;
  @ViewChild('timeOfDayDelever', { static: false })
  timeOfDayDelever: ElementRef;

  name = 'Angular ' + VERSION.major;
  calendar = [];
  maxScrollLeft = 0;
  totalTime;
  refreshIntervalId;
  $px = 0;
  hours = [];
  scale = 72 / (24 * 3600);

  scaleTime = 202 / (1 * 3600);

  booking_order = [
    {
      group_id: 'NC-0012',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: moment(),
          end_tine: '2022-07-20T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-002',
          start_time: '2022-07-25T17:00:00.000Z',
          end_tine: '2022-07-27T17:00:00.000Z',
        },
      ],
    },
    {
      group_id: 'NC-0013',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
      ],
    },
    {
      group_id: 'NC-0014',
      order: [
        {
          order_id: 'ORDER-0016',
          start_time: '2022-07-12T17:00:00.000Z',
          end_tine: '2022-07-15T17:00:00.000Z',
        },
      ],
    },
    {
      group_id: 'NC-0015',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: '2022-07-01T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
      ],
    },
  ];
  $pxTime = 0;

  constructor(private cdr: ChangeDetectorRef) {
    const startWeek = moment().startOf('month');
    const endWeek = moment().endOf('month');
    const diffDate = endWeek.diff(startWeek, 'days');
    let calendar = [startWeek];
    for (var week = 0; week < diffDate; week++) {
      calendar.push(moment(startWeek).add(week + 1, 'day'));
    }

    this.calendar = calendar;

    const posStart = moment().unix() - moment(this.calendar[0]).unix();

    this.$px = posStart * this.scale;

    this.refreshIntervalId = setInterval(() => {
      this.$px = this.$px + this.scale / 25;
    }, 25);

    const startHour = moment().startOf('days');
    const endHour = moment().endOf('hour');

    const diffHour = endHour.diff(startHour, 'hours');

    for (var h = 0; h < 24; h++) {
      this.hours.push(moment(startHour).add(h + 1, 'hour'));
    }

    const positionOfDeleverTime =
      moment().unix() - moment(this.hours[0]).unix();
    this.$pxTime = positionOfDeleverTime * this.scaleTime;
  }

  onScroll(el: Event) {
    if (
      this.el.nativeElement.scrollLeft ===
      this.el.nativeElement.scrollWidth - this.el.nativeElement.clientWidth
    ) {
      let lastElement = this.calendar.slice(-1);
      for (var week = 0; week < 10; week++) {
        this.calendar.push(moment(lastElement[0]).add(week + 1, 'day'));
      }
    }
  }
  start() {}
  stop() {
    clearInterval(this.refreshIntervalId);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    console.log(this.timeOfDayDelever.nativeElement.offsetWidth);
    this.totalTime =
      moment(this.calendar.slice(-1)[0]).unix() -
      moment(this.calendar[0]).unix();
    // this.scaleTotal =
    console.log(
      'qweqwe',
      moment('2022-07-12T17:00:00.000Z')
        .add(10, 'hours')
        .format('MMMM Do YYYY, h:mm:ss a')
    );

    this.cdr.detectChanges();
  }
}
