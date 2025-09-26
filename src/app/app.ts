import { Component, signal } from '@angular/core';
import { About } from './about/about';

@Component({
  selector: 'app-root',
  imports: [About],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tourkz');
}
