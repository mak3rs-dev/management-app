import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { InfoPage } from './info';
import { PipesModule } from './../../../../../../pipes/pipes.module';

@NgModule({
  declarations: [InfoPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ],
})
export class InfoPageModule {}
