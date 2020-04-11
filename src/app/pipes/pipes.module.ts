import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LinkifyPipe } from './linkify.pipe';
import { DatetimePipe } from './datetime.pipe';
import { TotalunitsPipe } from './totalunits.pipe';

const PIPES = [
  LinkifyPipe,
  DatetimePipe,
  TotalunitsPipe
];

@NgModule({
  declarations: [...PIPES],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [...PIPES]
})
export class PipesModule {}
