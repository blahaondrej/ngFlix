import { Component, Input } from '@angular/core'
import { imageBaseUrl } from '../../constants/images-sizes'
import { Movie } from '../../types/movie'

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.scss',
})
export class ShowItemComponent {
  @Input() showItem: Movie | null = null
  @Input() showType: 'tv' | 'movie' = 'movie'

  imageBaseUrl = imageBaseUrl
}
