import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { GroupCalendarEventComponent } from '../group-calendar-event/group-calendar-event';
import { EventProvider } from '../../providers/event/event';

@Component({
  selector: 'group-calendar',
  templateUrl: 'group-calendar.html'
})
export class GroupCalendarComponent {
  @Input() data: any;
  eventSource: any = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar: any = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'ru',
    noEventsLabel: 'Нет событий',
    formatMonthTitle: 'LLLL yyyy',
    startingDayMonth: 1
  };

  constructor(
    private modalCtrl: ModalController,
    private eventProvider: EventProvider
  ) {
  }

  ngOnInit() {
    this.eventSource = this.data.events;
  }

  removeEvent(event) {
    let events = this.eventSource
    let index = events.findIndex(el => {
      return el.title == event.title && event.startTime == el.startTime && event.endTime == el.endTime;
    });

    events.splice(index, 1);
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });
    this.eventProvider.removeEvent(this.data.id, event).subscribe();    
  }

  addGroupEvent() {
    let modal = this.modalCtrl.create(GroupCalendarEventComponent, {
      selectedDay: this.selectedDay
    });

    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;

        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
        this.eventProvider.addEvent(this.data.id, eventData).subscribe();
      }
    });
    modal.present();
  }

  onCurrentDateChanged(event) { }
  reloadSource(startTime, endTime) { }
  onEventSelected(event) { }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(event) {
    this.selectedDay = event.selectedTime;
  }

}
