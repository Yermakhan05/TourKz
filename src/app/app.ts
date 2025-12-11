import {Component, inject, signal, OnInit} from '@angular/core';
import { About } from './about/about';
import {Tours} from "./tours/tours";
import {TopBarComponent} from "./top-bar/top-bar.component";
import {RouterOutlet, RouterLink} from "@angular/router";
import {Profile} from "./components/profile/profile";
import {OfflineService} from "./services/offline.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {LanguageService} from "./services/language.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [TopBarComponent, RouterOutlet, AsyncPipe, NgIf, TranslateModule, RouterLink],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('tourkz');
  private offlineService = inject(OfflineService);
  private languageService = inject(LanguageService);

  online$ = this.offlineService.online$

  ngOnInit(): void {
    // Initialize language service (it will load saved language preference)
    this.languageService.setLanguage(this.languageService.getCurrentLanguage());
  }
}
