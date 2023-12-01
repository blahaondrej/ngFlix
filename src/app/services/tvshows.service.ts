import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { TvshowDto } from '../types/tvshow'

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  private apiUrlBase = 'https://api.themoviedb.org/3'
  private apiKey = '5ce207dceeef0fd2706e2bfeea210740'

  constructor(private http: HttpClient) {}

  getTvshowsByType(type: string, count = 12) {
    return this.http
      .get<TvshowDto>(`${this.apiUrlBase}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)))
  }
}
