import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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

  constructor(private dashboardService: DashboardService,
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

  private doGetMovies(filters?: any) {
    this.dashboardService.onGetMovies(filters).subscribe(res => {
      console.log('=== res movies ===', res)
      this.movies = res
    }, resError => {
      console.log('=== error movies ===', resError)
    })
  }

  doLoadTopYearAwards() {
    this.doGetTopYearAwards();
  }

  private doGetTopYearAwards() {
    this.dashboardService.onGetTopYearsAwards().subscribe(res => {
      console.log('=== res movies ===', res)
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
      console.log('=== res movies ===', res)
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
      console.log('=== res movies ===', res)
      this.producerAwardsInterval = res
    }, resError => {
      console.log('=== error movies ===', resError)
    })
  }

}
