import { Component, OnInit, signal } from '@angular/core'
import { Genre, Movie } from '../../types/movie'
import { Observable, map, tap } from 'rxjs'
import { MoviesService } from '../../services/movies.service'
import { ActivatedRoute } from '@angular/router'
import { PaginatorState } from 'primeng/paginator'
import { TvshowsService } from '../../services/tvshows.service'
import { MoviesDto } from '../../types/movie'

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
})
export class GenresComponent implements OnInit {
  showsList$: Observable<MoviesDto> | null = null
  showsType: 'movie' | 'tv' = 'movie'
  genres$: Observable<Genre[]> | null = null
  shows$: Observable<Movie[]> | null = null
  genreId = ''
  searchValue = ''
  totalRecords = signal(0)
  constructor(
    private MoviesService: MoviesService,
    private tvShowsService: TvshowsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.genreId = params['genreId']
      this.shows$ = this.MoviesService.getMoviesByGenre(this.genreId).pipe(
        map((data) => {
          return data.results
        })
      )
      this.genres$ = this.MoviesService.getMovieGenres()
      this.getPagedShows(1)
    })
  }

  getPagedShows(page: number) {
    this.shows$ = this.MoviesService.getMoviesByGenre(this.genreId, page).pipe(
      tap(({ total_results }) => this.totalRecords.set(total_results)),
      map((data) => {
        return data.results
      })
    )
  }

  onPageChange(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1
    this.getPagedShows(pageNumber)
  }

  showsListTrackBy(index: number, movie: Movie) {
    return movie.id
  }
}
