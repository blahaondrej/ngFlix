import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { MoviesService } from '../../services/movies.service'
import { imageBaseUrl } from '../../constants/images-sizes'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
    trigger('slideFade2', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('.2s')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}

  movies$ = this.moviesService.getMoviesByType('popular')

  slideIndex = 0

  imagesBaseUrl = imageBaseUrl

  changeSlide() {
    setInterval(() => {
      this.slideIndex++
      if (this.slideIndex > 10) {
        this.slideIndex = 0
      }
    }, 5000)
  }

  ngOnInit() {
    this.changeSlide()
  }
}
