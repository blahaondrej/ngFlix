import { Movie } from './movie'

export type Tvshow = {
  original_name: string
  id: number
  backdrop_path: string
  genre_ids: number[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  name: string
  vote_average: number
  vote_count: number
  first_air_date: string
}

export type TvshowDto = {
  page: number
  results: Tvshow[]
  total_pages: number
  total_results: number
}

export function mapToMovies(tvshows: Tvshow[]): Movie[] {
  return tvshows.map((tvshow: Tvshow) => {
    return {
      ...tvshow,
      title: tvshow.name,
      original_title: tvshow.original_name,
    }
  })
}

export function mapToMovie(tvshow: Tvshow): Movie {
  return {
    ...tvshow,
    title: tvshow.name,
    original_title: tvshow.original_name,
  }
}
