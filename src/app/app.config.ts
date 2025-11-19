import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';
import { environment } from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),

    // Init Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // ❗ Правильная инициализация Auth
    provideAuth(() => getAuth())
  ]
};