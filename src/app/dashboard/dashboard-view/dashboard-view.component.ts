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

  loadTopYears: boolean = false;
  loadTopStudios: boolean = false;
  loadIntervals: boolean = false;
  loadWinners: boolean = false;

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
    this.doSetLoadWinners(true);

    this.moviesService.onGetMovies(filters).subscribe(res => {
      this.doSetList(res, this.page);
    }, resError => {
      console.log('=== error movies ===', resError)
      this.doSetLoadWinners(false);
    }, () => {
      this.doSetLoadWinners(false);
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
    this.doSetLoadTopYears(true);

    this.moviesService.onGetTopYearsAwards().subscribe(res => {
      this.topYearsAwards = res
    }, resError => {
      console.log('=== error movies ===', resError)
      this.doSetLoadTopYears(false);
    }, () => {
      this.doSetLoadTopYears(false);
    })
  }

  doLoadTopStudios() {
    this.doGetTopStudios();
  }

  private doGetTopStudios() {
    this.doSetLoadTopStudios(true);

    this.moviesService.onGetTopStudiosAwards().subscribe(res => {
      this.topStudios = res
    }, resError => {
      console.log('=== error movies ===', resError)
      this.doSetLoadTopStudios(false);
    }, () => {
      this.doSetLoadTopStudios(false);
    })
  }

  doLoadAwardInterval() {
    this.doGetAwardInterval();
  }

  private doGetAwardInterval() {
    this.doSetLoadIntervals(true)

    this.dashboardService.onGetAwardInterval().subscribe(res => {
      this.producerAwardsInterval = res
    }, resError => {
      console.log('=== error movies ===', resError)
      this.doSetLoadIntervals(false)
    }, () => {
      this.doSetLoadIntervals(false)
    })
  }

  private doSetLoadTopYears(active: boolean) {
    this.loadTopYears = active
  }

  private doSetLoadTopStudios(active: boolean) {
    this.loadTopStudios = active
  }

  private doSetLoadIntervals(active: boolean) {
    this.loadIntervals = active
  }

  private doSetLoadWinners(active: boolean) {
    this.loadWinners = active
  }
}
