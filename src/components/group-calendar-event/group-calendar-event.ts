import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import * as moment from 'moment';

@Component({
  selector: 'group-calendar-event',
  templateUrl: 'group-calendar-event.html'
})
export class GroupCalendarEventComponent {
  edit: boolean = false;
  event: any = {
    title: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
  };
  minDate: any;
  error: string = '';

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams
  ) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();

    this.minDate = moment(new Date().toISOString()).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;

    this.edit = this.navParams.get('edit') ? true : false;

    if (this.edit){
      let e = this.navParams.get('event');

      this.event = {
        title: e.title,
        startTime: moment(new Date(e.startTime).toISOString()).format(),
        endTime: moment(new Date(e.endTime).toISOString()).format(),
        allDay: false
      };
    }
  }

  save() {
    this.error = '';

    if (this.event.startTime > this.event.endTime) {
      this.error = 'Дата окончания не может быть меньше даты начала'
    } else {
      this.viewCtrl.dismiss(this.event);
    }
  }

}
