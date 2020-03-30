import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { StockPage } from './stock';

@NgModule({
  declarations: [StockPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class StockPageModule {}
