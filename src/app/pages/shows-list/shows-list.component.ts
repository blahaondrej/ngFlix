import { Component, OnInit } from '@angular/core'
import { MoviesService } from '../../services/movies.service'
import { Observable, map } from 'rxjs'
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

  constructor(
    private MoviesService: MoviesService,
    private tvShowsService: TvshowsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showsType = this.route.snapshot.params['type']
    this.getPagedShows(this.showsType, 1)
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

  searchChanged() {
    this.getPagedShows(this.showsType, 1, this.searchValue)
  }

  onPageChange(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1
    this.getPagedShows(this.showsType, pageNumber, this.searchValue)
  }
}
