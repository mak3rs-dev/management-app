import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { InfoPage } from './info';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InfoPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class InfoPageModule {}
