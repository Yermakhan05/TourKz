import { Component, signal } from '@angular/core';
import { About } from './about/about';
import {Tours} from "./tours/tours";

@Component({
  selector: 'app-root',
    imports: [About, Tours],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tourkz');
}
