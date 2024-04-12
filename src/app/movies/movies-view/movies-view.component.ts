import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.css']
})
export class MoviesViewComponent implements OnInit {

  moviesFiltersForm: FormGroup;
  yearTextChange: FormControl;
  winnerChange: FormControl;

  movies: any[] = [];

  constructor(private moviesService: MoviesService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.doCreateMoviesFiltersForm();
    this.doLoadMovies();
  }
  
  //#region === FUNCOES DO FORMULARIOS DE FILTROS ===

  doCreateMoviesFiltersForm() {
    this.yearTextChange = this.fb.control('');
    this.winnerChange = this.fb.control(null);

    this.moviesFiltersForm = new FormGroup({
      year: this.yearTextChange,
      winner: this.winnerChange
    })

    this.doActiveFiltersChange();
  }

  doClearMoviesFilters() {
    if (this.moviesFiltersForm) {
      this.moviesFiltersForm.reset();
      this.doCreateMoviesFiltersForm();
    }
  }

  doActiveFiltersChange() {
    this.yearTextChange.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(res => {
        this.doLoadMovies(this.moviesFiltersForm.value);
      });

    this.winnerChange.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(res => {
        this.doLoadMovies(this.moviesFiltersForm.value);
      });
  }

  //#endregion


  doLoadMovies(filters?: any) {
    this.doGetMovies(filters);
  }

  private doGetMovies(filters?: any) {
    this.moviesService.onGetMovies(filters).subscribe(res => {
      console.log('=== res movies ===', res)
      this.movies = res
    }, resError => {
      console.log('=== error movies ===', resError)
    })
  }

  winnerOptions(): any[] {
    return [
      {param: null, name: 'Yes/No'},
      {param: true, name: 'Yes'},
      {param: false, name: 'No'}
    ]
  }
}
