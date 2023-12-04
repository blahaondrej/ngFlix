import { Component, OnInit } from '@angular/core'
import { Genre, Movie, MoviesDto } from '../../types/movie'
import { Observable, map } from 'rxjs'
import { MoviesService } from '../../services/movies.service'
import { ActivatedRoute } from '@angular/router'
import { PaginatorState } from 'primeng/paginator'
import { mapToMoviesDto } from '../../types/tvshow'
import { TvshowsService } from '../../services/tvshows.service'

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
  constructor(
    private MoviesService: MoviesService,
    private tvShowsService: TvshowsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.genreId = params['genreId']
      this.showsType = params['type']
      this.shows$ = this.MoviesService.getMoviesByGenre(this.genreId)
      this.genres$ = this.MoviesService.getMovieGenres()
      this.getPagedShows(this.showsType, 1, this.searchValue)
    })
  }

  getPagedShows(
    showsType: 'movie' | 'tv',
    page: number,
    searchKeyword?: string
  ) {
    if (showsType === 'movie') {
      this.showsList$ = this.MoviesService.searchMovies(page, searchKeyword)
    }
    if (showsType === 'tv') {
      this.showsList$ = this.tvShowsService
        .searchTvShows(page, searchKeyword)
        .pipe(map(mapToMoviesDto))
    }
  }

  onPageChange(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1
    this.getPagedShows(this.showsType, pageNumber, this.searchValue)
  }
}
