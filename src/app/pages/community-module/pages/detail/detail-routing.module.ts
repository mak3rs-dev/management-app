import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DetailPage } from './detail.page';
import { InfoPage } from './tabs/info/info';
import { PiecesPage } from './tabs/pieces/pieces';
import { RankingPage } from './tabs/ranking/ranking';

const routes: Routes = [{
  path: '',
  component: DetailPage,
  children: [
    { path: 'info', component: InfoPage },
    { path: 'pieces', component: PiecesPage },
    { path: 'ranking', component: RankingPage },
    { path: '', redirectTo: 'info', pathMatch: 'full' }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
