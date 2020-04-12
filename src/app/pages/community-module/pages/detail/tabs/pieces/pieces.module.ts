import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PiecesPage } from './pieces';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [PiecesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ],
})
export class PiecesPageModule {}
