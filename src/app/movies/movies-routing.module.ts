import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesViewComponent } from './movies-view/movies-view.component';

const routes: Routes = [
  {
      path: '', component: MoviesViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
