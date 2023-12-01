import { Component } from '@angular/core'
import { MoviesService } from '../../services/movies.service'
import { TvshowsService } from '../../services/tvshows.service'
import { map } from 'rxjs'
import { mapToMovies } from '../../types/tvshow'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private moviesService: MoviesService,
    private tvshowsService: TvshowsService
  ) {}

  upcomingMovies$ = this.moviesService.getMoviesByType('upcoming', 6)
  topRatedMovies$ = this.moviesService.getMoviesByType('top_rated')

  popularTvshows$ = this.tvshowsService
    .getTvshowsByType('popular')
    .pipe(map(mapToMovies))
}
