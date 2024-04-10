import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  movies: any[] = [];
  topYearsAwards: any[] = [];
  topStudios: any[] = [];
  producerAwardsInterval: any[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.doLoadMovies();
    this.doLoadTopYearAwards();
    this.doLoadTopStudios();
    this.doLoadAwardInterval();
  }

  doLoadMovies() {
    this.doGetMovies();
  }

  private doGetMovies() {
    this.dashboardService.onGetMovies().subscribe(res => {
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
