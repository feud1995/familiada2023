import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
  {
    path: 'panel',
    component: PanelComponent
  },
  {
    path: '**',
    component: BoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
