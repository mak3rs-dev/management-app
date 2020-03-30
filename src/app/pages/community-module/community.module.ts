import { NgModule } from '@angular/core';
import { ListPage } from './pages/list/list.page';

import { IonicModule } from '@ionic/angular';
import { CommunityRoutingModule } from './community-routing.module';
import { CommonModule } from '@angular/common';
import { DetailPageModule } from './pages/detail/detail.module';

const PAGES = [ ListPage ];

@NgModule({
  declarations: [...PAGES],
  entryComponents: [...PAGES],
  imports: [
    CommonModule,
    IonicModule,
    CommunityRoutingModule,
    DetailPageModule
  ]
})
export class CommunityModule {}
