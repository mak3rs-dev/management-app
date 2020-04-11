import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailPage } from './detail.page';
import { InfoPageModule } from './tabs/info/info.module';
import { PiecesPageModule } from './tabs/pieces/pieces.module';
import { RankingPageModule } from './tabs/ranking/ranking.module';
import { CollectPageModule } from './tabs/collect/collect.module';

@NgModule({
  declarations: [
    DetailPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    InfoPageModule,
    PiecesPageModule,
    RankingPageModule,
    CollectPageModule,
    DetailRoutingModule
  ]
})
export class DetailPageModule {}
