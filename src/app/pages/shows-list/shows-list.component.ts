import { Component, OnInit, signal } from '@angular/core'
import { MoviesService } from '../../services/movies.service'
import { Observable, map, tap } from 'rxjs'
import { MoviesDto } from '../../types/movie'
import { PaginatorState } from 'primeng/paginator'
import { TvshowsService } from '../../services/tvshows.service'
import { ActivatedRoute } from '@angular/router'
import { mapToMoviesDto } from '../../types/tvshow'

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.scss',
})
export class ShowsListComponent implements OnInit {
  showsList$: Observable<MoviesDto> | null = null

  searchValue = ''
  showsType: 'movie' | 'tv' = 'movie'

  totalRecords = signal(0)

  constructor(
    private MoviesService: MoviesService,
    private tvShowsService: TvshowsService,
    private route: ActivatedRoute
  ) {}

  getPagedShows(
    showsType: 'movie' | 'tv',
    page: number,
    searchKeyword?: string
  ) {
    if (showsType === 'movie') {
      this.showsList$ = this.MoviesService.searchMovies(
        page,
        searchKeyword
      ).pipe(tap(({ total_pages }) => this.totalRecords.set(total_pages)))
    }
    if (showsType === 'tv') {
      this.showsList$ = this.tvShowsService
        .searchTvShows(page, searchKeyword)
        .pipe(map(mapToMoviesDto))
    }
  }

  searchChanged() {
    this.getPagedShows(this.showsType, 1, this.searchValue)
  }

  onPageChange(event: PaginatorState) {
    console.log('event', event)

    const pageNumber = event.page ? event.page + 1 : 1
    this.getPagedShows(this.showsType, pageNumber, this.searchValue)
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.showsType = params['type']
      this.getPagedShows(this.showsType, 1, this.searchValue)
    })
  }
}
