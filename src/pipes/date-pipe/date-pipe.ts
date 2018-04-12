import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'datePipe',
})
export class DatePipe implements PipeTransform {
  month = [
    "янв", "фев", "мар", "апр", "май", "июн",
    "июл", "авг", "сен", "окт", "нояб", "дек"
  ];

  transform(d: string, ...args) {
    let date = new Date(d);
    let now = new Date();
    let str = "";
    let time = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

    if (now.getDate() > date.getDate() && now.getFullYear() == date.getFullYear()) {
      str += date.getDate() + ' ' + this.month[date.getMonth()];
      if (args[0] == 'message') {
        str += ' ' + time;
      }
    } else if (now.getFullYear() > date.getFullYear()) {
      str += date.getDate() + ' ' + this.month[date.getMonth()] + ' ' + date.getFullYear();
      if (args[0] == 'message') {
        str += ' ' + time;
      }
    } else {
      str += time;
    }

    return str;
  }
}
