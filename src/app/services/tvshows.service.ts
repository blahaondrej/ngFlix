import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { Tvshow, TvshowDto } from '../types/tvshow'
import { CreditsDto } from '../types/credits'
import { ImageDto } from '../types/image'
import { VideoDto } from '../types/video'

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  private apiUrlBase = 'https://api.themoviedb.org/3'
  private apiKey = '5ce207dceeef0fd2706e2bfeea210740'

  constructor(private http: HttpClient) {}

  getTvshowByType(type: string, count = 12) {
    return this.http
      .get<TvshowDto>(`${this.apiUrlBase}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)))
  }

  getTvshowById(id: string) {
    return this.http.get<Tvshow>(
      `${this.apiUrlBase}/tv/${id}?api_key=${this.apiKey}`
    )
  }
  getTvshowVideos(id: string) {
    return this.http
      .get<VideoDto>(
        `${this.apiUrlBase}/tv/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results))
  }

  getTvshowImages(id: string) {
    return this.http
      .get<ImageDto>(
        `${this.apiUrlBase}/tv/${id}/images?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.backdrops))
  }

  getTvshowCast(id: string) {
    return this.http
      .get<CreditsDto>(
        `${this.apiUrlBase}/tv/${id}/credits?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.cast))
  }

  getSimilarTvshows(id: string) {
    return this.http
      .get<TvshowDto>(
        `${this.apiUrlBase}/tv/${id}/similar?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results.slice(0, 12)))
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular'
    return this.http.get<TvshowDto>(
      `${this.apiUrlBase}${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`
    )
  }
}
