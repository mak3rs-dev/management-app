import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListPage } from './pages/list/list.page';
import { DetailPage } from './pages/detail/detail.page';

const routes: Routes = [
  { path: 'list', component: ListPage },
  { path: ':alias/detail', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: ':alias', redirectTo: ':alias/detail' },
  { path: '', pathMatch: 'full', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityRoutingModule {
}
