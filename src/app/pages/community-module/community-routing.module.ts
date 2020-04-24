import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListPage } from './pages/list/list.page';
import { SendMessagePage } from './pages/sendmessage/sendmessage.page';


const routes: Routes = [
  { path: 'list', component: ListPage },
  { path: ':alias/message', component: SendMessagePage },
  { path: ':alias/detail', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  // { path: ':alias/:maker_num', redirectTo: ':alias/detail' },
  { path: ':alias', redirectTo: ':alias/detail' },
  { path: '', pathMatch: 'full', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityRoutingModule {
}
