import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MoviesDto } from '../types/movie'
import { map } from 'rxjs'

@Injectable()
export class MoviesService {
  private apiUrlBase = 'https://api.themoviedb.org/3'
  private apiKey = '5ce207dceeef0fd2706e2bfeea210740'

  constructor(private http: HttpClient) {}

  getMoviesByType(type: string, count = 12) {
    return this.http
      .get<MoviesDto>(`${this.apiUrlBase}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)))
  }
}
