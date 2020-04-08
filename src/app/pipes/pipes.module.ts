import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LinkifyPipe } from './linkify.pipe';

@NgModule({
  declarations: [
    LinkifyPipe
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
      LinkifyPipe
  ]
})
export class PipesModule {}
