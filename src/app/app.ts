import { Component, signal } from '@angular/core';
import { About } from './about/about';
import {Tours} from "./tours/tours";
import {TopBarComponent} from "./top-bar/top-bar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [TopBarComponent, RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tourkz');
}
