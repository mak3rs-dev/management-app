import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RankingPage } from './ranking';

@NgModule({
  declarations: [RankingPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class RankingPageModule {}
