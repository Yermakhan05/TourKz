import {Component, inject, signal} from '@angular/core';
import { About } from './about/about';
import {Tours} from "./tours/tours";
import {TopBarComponent} from "./top-bar/top-bar.component";
import {RouterOutlet} from "@angular/router";
import {Profile} from "./components/profile/profile";
import {OfflineService} from "./services/offline.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [TopBarComponent, RouterOutlet, AsyncPipe, NgIf],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tourkz');
  private offlineService = inject(OfflineService);

  online$ = this.offlineService.online$
}
