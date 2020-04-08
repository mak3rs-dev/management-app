import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RankingPage } from './ranking';

import { PipesModule } from './../../../../../../pipes/pipes.module';

@NgModule({
  declarations: [RankingPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ],
})
export class RankingPageModule {}
