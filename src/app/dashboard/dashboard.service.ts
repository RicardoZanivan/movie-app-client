import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  onGetMovies(filters?: any): Observable<any[]> {
    const query = '';

    return this.http.get<any[]>(`${environment.apiHost}/api/movies${query}`);
  }

  onGetTopYearsAwards(filters?: any): Observable<any[]> {
    const query = '';

    return this.http.get<any[]>(`${environment.apiHost}/api/topyearsawards${query}`);
  }

  onGetTopStudios(filters?: any): Observable<any[]> {
    const query = '';

    return this.http.get<any[]>(`${environment.apiHost}/api/topstudios${query}`);
  }

  onGetAwardInterval(filters?: any): Observable<any[]> {
    const query = '';

    return this.http.get<any[]>(`${environment.apiHost}/api/winintervalproducers${query}`);
  }
}
