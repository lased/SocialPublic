import { NgModule } from '@angular/core';
import { DatePipe } from './date-pipe/date-pipe';
import { ObjNgForPipe } from './obj-ng-for/obj-ng-for';
@NgModule({
	declarations: [DatePipe,
    ObjNgForPipe],
	imports: [],
	exports: [DatePipe,
    ObjNgForPipe]
})
export class PipesModule {}
