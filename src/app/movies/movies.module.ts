import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MoviesViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
