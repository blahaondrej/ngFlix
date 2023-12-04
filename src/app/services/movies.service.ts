import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Movie, MoviesDto } from '../types/movie'
import { map } from 'rxjs'
import { VideoDto } from '../types/video'
import { ImageDto } from '../types/image'
import { CreditsDto } from '../types/credits'

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
  getMovieById(id: string) {
    return this.http.get<Movie>(
      `${this.apiUrlBase}/movie/${id}?api_key=${this.apiKey}`
    )
  }
  getMovieVideos(id: string) {
    return this.http
      .get<VideoDto>(
        `${this.apiUrlBase}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results))
  }

  getMovieImages(id: string) {
    return this.http
      .get<ImageDto>(
        `${this.apiUrlBase}/movie/${id}/images?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.backdrops))
  }

  getMovieCast(id: string) {
    return this.http
      .get<CreditsDto>(
        `${this.apiUrlBase}/movie/${id}/credits?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.cast))
  }

  getSimilarMovie(id: string) {
    return this.http
      .get<MoviesDto>(
        `${this.apiUrlBase}/movie/${id}/similar?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results.slice(0, 12)))
  }

  searchMovies(page: number, searchValue?: string) {
    return this.http
      .get<MoviesDto>(
        `${this.apiUrlBase}/search/movie?page=${page}?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results))
  }
}
