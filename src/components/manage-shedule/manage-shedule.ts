import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IShedule } from '../../providers/shedule/shedule.model';
import { SheduleProvider } from '../../providers/shedule/shedule';

const dayWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const weeks = {
  topWeek: 'Верхняя неделя',
  lowerWeek: 'Нижняя неделя'
};

@Component({
  selector: 'manage-shedule',
  templateUrl: 'manage-shedule.html'
})
export class ManageSheduleComponent {
  pairsForm: FormGroup;
  sheduleForm: FormGroup;

  groupId: any;
  shedule: IShedule;
  menu: string = 'shedule';
  dayWeek: Array<string>;
  weeks: any;
  error: string = '';

  dragNDrop: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private sheduleProvider: SheduleProvider
  ) {
    this.groupId = this.navParams.get('id');
    this.shedule = this.navParams.get('shedule');
    this.dayWeek = dayWeek;
    this.weeks = weeks;

    if (this.shedule == null)
      this.shedule = {
        pairs: [],
        topWeek: [],
        lowerWeek: []
      };
    else if (!this.shedule.pairs)
      this.shedule.pairs = [];
    else if (!this.shedule.topWeek)
      this.shedule.topWeek = [];
    else if (!this.shedule.lowerWeek)
      this.shedule.lowerWeek = [];

    this.shedule.pairs.sort((a, b) => {
      return a.number - b.number;
    });
  }

  saveShedule(){
    this.sheduleProvider.addShedule(this.groupId, {
      lowerWeek: this.shedule.lowerWeek,
      topWeek: this.shedule.topWeek
    }).subscribe();
  }

  removeMoved(item, list) {
    console.log(list);
    list.splice(list.indexOf(item), 1);
  }

  addPair() {
    let pair = this.pairsForm.value;
    let indexPair = this.shedule.pairs.findIndex(el => {
      return el.number == pair.number;
    });

    this.error = '';

    if (pair.startTime >= pair.endTime) {
      this.error = 'Время начала не может быть больше или равно времени окончания'
    } else if (indexPair != -1) {
      this.error = 'Данная пара существует'
    } else {
      this.shedule.pairs.push({
        number: pair.number,
        startTime: pair.startTime,
        endTime: pair.endTime
      });
      this.sheduleProvider.addPair(this.groupId, this.shedule.pairs).subscribe();
      this.pairsForm.reset();
    }
  }

  removePair(index) {
    this.shedule.pairs.splice(index, 1);
    this.sheduleProvider.addPair(this.groupId, this.shedule.pairs).subscribe();
  }

  addShedule() {
    let shedule = this.sheduleForm.value;
    let index;

    if (!this.shedule[shedule.week][shedule.dayWeek])
      this.shedule[shedule.week][shedule.dayWeek] = []

    index = this.shedule[shedule.week][shedule.dayWeek].findIndex(el => {
      return el.pair == shedule.pair;
    });

    this.error = '';

    if (index != -1) {
      this.error = 'Данная пара существует'
    } else {
      index = this.shedule.pairs.findIndex(el => {
        return el.number == shedule.pair;
      });

      this.shedule[shedule.week][shedule.dayWeek].push({
        pair: shedule.pair,
        startTime: this.shedule.pairs[index].startTime,
        endTime: this.shedule.pairs[index].endTime,
        subject: shedule.subject,
        teacher: shedule.teacher,
        lectureHall: shedule.lectureHall
      });
      this.sheduleProvider.addShedule(this.groupId, {
        lowerWeek: this.shedule.lowerWeek,
        topWeek: this.shedule.topWeek
      }).subscribe();
      this.sheduleForm.reset();
    }
  }

  removeShedule(type, index) {
    this.shedule[type].splice(index, 1);
    this.sheduleProvider.addShedule(this.groupId, {
      lowerWeek: this.shedule.lowerWeek,
      topWeek: this.shedule.topWeek
    }).subscribe();
  }

  ngOnInit() {
    this.pairsForm = this.fb.group({
      number: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    })
    this.sheduleForm = this.fb.group({
      week: ['', Validators.required],
      dayWeek: ['', Validators.required],
      pair: ['', Validators.required],
      subject: ['', Validators.required],
      teacher: [''],
      lectureHall: ['', Validators.required]
    });
  }

}

@Component({
  selector: 'full-shedule',
  templateUrl: 'full-shedule.html'
})
export class FullSheduleComponent {
  shedule: any;
  weeks: any;
  dayWeek: any;

  constructor(
    private navParams: NavParams,
  ) {
    this.shedule = this.navParams.get('shedule');

    this.weeks = weeks;
    this.dayWeek = dayWeek;
  }
}
