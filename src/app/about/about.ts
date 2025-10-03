import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  // 2. Property binding
  isButtonDisabled = false;
  likes = 0;

  // 3. Event binding
  messageVisible = false;

  toggleMessage() {
    this.messageVisible = !this.messageVisible;
  }

  like() {
    this.likes++;
  }

  // 4. Two-way binding
  name = '';
  email = '';
  subscribed = false;
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  subscribe() {
    if (this.email) {
      this.subscribed = true;
    }
  }
  ngOnInit() {}

  constructor() {
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