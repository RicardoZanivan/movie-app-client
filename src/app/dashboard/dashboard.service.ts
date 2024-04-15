import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  private onFormatFiltersToString(params: any): string {
    let filters: string = '';

    if (params) {
      if (params.yearSearchText) filters = `year=${params.yearSearchText}`;
      if (params.winner != undefined) filters += (filters) ? `&winner=${params.winner}` : `winner=${params.winner}`;

      if (filters) filters = `?${filters}`;
    }

    return filters
  }

  onGetMovies(filters?: any): Observable<any[]> {
    const query = this.onFormatFiltersToString(filters);

    return this.http.get<any[]>(`${environment.apiHost}/api/movies${query}`);
  }

  onGetAwardInterval(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiHost}/api/productors/awardsInterval`);
  }
}
