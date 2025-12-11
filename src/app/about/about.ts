import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit, OnDestroy {
  intervalId: any;
  currentIndex: number = 0;
  images: string[] = ['assets/slide1.jpg', 'assets/slide2.jpg', 'assets/slide3.jpg'];
  link_img: string = 'assets/slide1.jpg';

  // 1. Интерполяция
  title = 'Why Us?';
  mission = 'These popular destinations have something to offer';



  ngOnInit() {}

  constructor(private translate: TranslateService) {
    this.intervalId = setInterval(() => {
      this.changeImage();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  changeImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.link_img = this.images[this.currentIndex];
  }
}