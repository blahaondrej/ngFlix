import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, Input, OnInit } from '@angular/core'
import { imageBaseUrl } from '../../constants/images-sizes'
import { Movie } from '../../types/movie'

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
  @Input() slides: Movie[] = []

  @Input() isHeader = false

  constructor() {}

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
    if (!this.isHeader) {
      this.changeSlide()
    }
  }
}
