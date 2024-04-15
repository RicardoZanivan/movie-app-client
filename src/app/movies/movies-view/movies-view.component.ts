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
  page: number = 1;
  loadMovies: boolean = false;

  winnerOptions = [
    {param: '', name: 'Yes/No'},
    {param: true, name: 'Yes'},
    {param: false, name: 'No'}
  ]

  constructor(private moviesService: MoviesService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.doCreateMoviesFiltersForm();
    this.doLoadMovies();
  }
  
  //#region === FUNCOES DO FORMULARIOS DE FILTROS ===

  doCreateMoviesFiltersForm() {
    this.yearTextChange = this.fb.control('');
    this.winnerChange = this.fb.control('');

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
    this.page = 1;

    this.doGetMovies(filters);
  }

  doLoadNextPage() {
    this.page++
    const filters = {...this.moviesFiltersForm.value, page: this.page};

    this.doGetMovies(filters);
  }

  private doGetMovies(filters?: any) {
    this.doSetLoadMovies(true);

    this.moviesService.onGetMovies(filters).subscribe(res => {
      this.doSetList(res, this.page);
    }, resError => {
      console.log('=== error movies ===', resError)
      this.doSetLoadMovies(false);
    }, () => {
      this.doSetLoadMovies(false);
    })
  }

  doSetList(items: any[], page: number) {
    if (items) {
      if (!page || page <= 1) this.movies = items;
      else this.movies = this.movies.concat(items);
    }
  }

  doSetLoadMovies(active: boolean) {
    this.loadMovies = active;
  }
}
