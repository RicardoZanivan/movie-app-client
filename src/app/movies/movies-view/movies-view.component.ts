import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.css']
})
export class MoviesViewComponent implements OnInit {

  movies: any[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.doLoadMovies();
  }

  doLoadMovies() {
    this.doGetMovies();
  }

  private doGetMovies() {
    this.moviesService.onGetMovies().subscribe(res => {
      console.log('=== res movies ===', res)
      this.movies = res
    }, resError => {
      console.log('=== error movies ===', resError)
    })
  }

}
