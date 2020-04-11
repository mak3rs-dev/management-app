import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { CollectPage } from './collect';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DetailRoutingModule } from '../../detail-routing.module';

@NgModule({
  declarations: [CollectPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    DetailRoutingModule
  ],
})
export class CollectPageModule {}
