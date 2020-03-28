import { NgModule } from '@angular/core';
import { ListPage } from './pages/list/list.page';
import { EditPage } from './pages/edit/edit.page';
import { IonicModule } from '@ionic/angular';
import { CommunityRoutingModule } from './community-routing.module';
import { CommonModule } from '@angular/common';

const PAGES = [ ListPage, EditPage ];

@NgModule({
  declarations: [...PAGES],
  entryComponents: [...PAGES],
  imports: [
    CommonModule,
    IonicModule,
    CommunityRoutingModule
  ]
})
export class CommunityModule {}
