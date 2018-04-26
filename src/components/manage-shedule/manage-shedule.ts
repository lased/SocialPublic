import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IShedule } from '../../providers/shedule/shedule.model';
import { SheduleProvider } from '../../providers/shedule/shedule';

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
  error: string = '';

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private sheduleProvider: SheduleProvider
  ) {
    this.groupId = this.navParams.get('id');
    this.shedule = this.navParams.get('shedule');
    this.dayWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

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
    })
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
      this.shedule[shedule.week][shedule.dayWeek].push({
        pair: shedule.pair,
        subject: shedule.subject,
        teacher: shedule.teacher,
        lectureHall: shedule.lectureHall
      });
      this.sheduleProvider.addShedule(this.groupId, {
        lowerWeek: this.shedule.lowerWeek,
        topWeek: this.shedule.topWeek
      }).subscribe();
    }
  }

  removeShedule(){
    
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
