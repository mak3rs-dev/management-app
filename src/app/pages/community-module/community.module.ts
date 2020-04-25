import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListPage } from './pages/list/list.page';

import { IonicModule } from '@ionic/angular';
import { CommunityRoutingModule } from './community-routing.module';
import { CommonModule } from '@angular/common';
import { DetailPageModule } from './pages/detail/detail.module';
import { ComponentsModule } from './components/components.module';
import { SendMessagePage } from './pages/sendmessage/sendmessage.page';

const PAGES = [
  ListPage,
  SendMessagePage
];

@NgModule({
  declarations: [...PAGES],
  entryComponents: [...PAGES],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CommunityRoutingModule,
    DetailPageModule,
    ComponentsModule
  ]
})
export class CommunityModule {}
