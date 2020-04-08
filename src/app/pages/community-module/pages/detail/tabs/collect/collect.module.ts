import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { CollectPage } from './collect';
import { DetailRoutingModule } from '../../detail-routing.module';

@NgModule({
  declarations: [CollectPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailRoutingModule
  ],
})
export class CollectPageModule {}
