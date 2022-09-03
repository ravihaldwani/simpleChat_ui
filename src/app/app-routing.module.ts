import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupViewComponent } from './components/group-view/group-view.component';

const routes: Routes = [
  { path: 'groups/:id', component: GroupViewComponent },
  { path: '', component: GroupListComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
