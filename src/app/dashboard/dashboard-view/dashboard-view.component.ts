import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MoviesService } from 'src/app/movies/movies.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  moviesFiltersForm: FormGroup;
  yearTextChange: FormControl;

  movies: any[] = [];
  topYearsAwards: any[] = [];
  topStudios: any[] = [];
  producerAwardsInterval: any[] = [];
  page: number = 1;

  constructor(private dashboardService: DashboardService,
              private moviesService: MoviesService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.doCreateMoviesFiltersForm();
    this.doLoadMovies();
    this.doLoadTopYearAwards();
    this.doLoadTopStudios();
    this.doLoadAwardInterval();
  }

  //#region === FUNCOES DO FORMULARIOS DE FILTROS ===

  doCreateMoviesFiltersForm() {
    this.yearTextChange = this.fb.control('');

    this.moviesFiltersForm = new FormGroup({
      yearSearchText: this.yearTextChange,
      // winner: new FormControl(true)
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
    }

  //#endregion

  doLoadMovies(filters?: any) {
    this.doGetMovies(filters);
  }

  doLoadNextPage() {
    this.page++
    const filters = {...this.moviesFiltersForm.value, page: this.page};

    this.doGetMovies(filters);
  }

  private doGetMovies(filters?: any) {
    this.moviesService.onGetMovies(filters).subscribe(res => {
      this.doSetList(res, this.page);
    }, resError => {
      console.log('=== error movies ===', resError)
    })
  }

  doSetList(items: any[], page: number) {
    if (items) {
      if (!page || page <= 1) this.movies = items;
      else this.movies = this.movies.concat(items);
    }
  }

  doLoadTopYearAwards() {
    this.doGetTopYearAwards();
  }

  private doGetTopYearAwards() {
    this.dashboardService.onGetTopYearsAwards().subscribe(res => {
      this.topYearsAwards = res
    }, resError => {
      console.log('=== error movies ===', resError)
    })
  }

  doLoadTopStudios() {
    this.doGetTopStudios();
  }

  private doGetTopStudios() {
    this.dashboardService.onGetTopStudios().subscribe(res => {
      this.topStudios = res
    }, resError => {
      console.log('=== error movies ===', resError)
    })
  }

  doLoadAwardInterval() {
    this.doGetAwardInterval();
  }

  private doGetAwardInterval() {
    this.dashboardService.onGetAwardInterval().subscribe(res => {
      this.producerAwardsInterval = res
    }, resError => {
      console.log('=== error movies ===', resError)
    })
  }

}
