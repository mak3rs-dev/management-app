import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListPage } from './pages/list/list.page';
import { EditPage } from './pages/edit/edit.page';

const routes: Routes = [
  { path: 'list', component: ListPage },
  { path: ':alias/detail', component: EditPage },
  { path: ':alias/edit', component: EditPage },
  { path: '', pathMatch: 'full', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityRoutingModule {
}
