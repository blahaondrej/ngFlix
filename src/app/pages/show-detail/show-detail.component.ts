import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MoviesService } from '../../services/movies.service'
import { Observable, map } from 'rxjs'
import { Movie } from '../../types/movie'
import { IMAGES_SIZES } from '../../constants/images-sizes'
import { Video } from '../../types/video'
import { Image } from '../../types/image'
import { Actor } from '../../types/credits'
import { mapToMovies, mapToMovie } from '../../types/tvshow'
import { TvshowsService } from '../../services/tvshows.service'

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss',
})
export class ShowDetailComponent implements OnInit {
  showId = ''

  showType: 'tv' | 'movie' = 'movie'

  show$: Observable<Movie> | null = null
  showVideos$: Observable<Video[]> | null = null
  showImages$: Observable<Image[]> | null = null
  showCast$: Observable<Actor[]> | null = null
  showSimilarShows$: Observable<Movie[]> | null = null

  imagesSizes = IMAGES_SIZES

  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesService,
    private tvService: TvshowsService
  ) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.showId = params['id']
      this.showType = params['type']
      if (this.showType === 'movie') {
        this.show$ = this.moviesService.getMovieById(this.showId)
        this.showVideos$ = this.moviesService.getMovieVideos(this.showId)
        this.showImages$ = this.moviesService.getMovieImages(this.showId)
        this.showCast$ = this.moviesService.getMovieCast(this.showId)
        this.showSimilarShows$ = this.moviesService.getSimilarMovie(this.showId)
      }
      if (this.showType === 'tv') {
        this.show$ = this.tvService
          .getTvshowById(this.showId)
          .pipe(map(mapToMovie))
        this.showVideos$ = this.tvService.getTvshowVideos(this.showId)
        this.showImages$ = this.tvService.getTvshowImages(this.showId)
        this.showCast$ = this.tvService.getTvshowCast(this.showId)
        this.showSimilarShows$ = this.tvService
          .getSimilarTvshows(this.showId)
          .pipe(map(mapToMovies))
      }
    })
  }
}
