import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PiecesPage } from './pieces';

@NgModule({
  declarations: [PiecesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class PiecesPageModule {}
