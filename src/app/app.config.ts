import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';
import { environment } from "../environments/environment";
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './tours/state/items.reducer';
import { provideEffects } from '@ngrx/effects';
import { ItemsEffects } from './tours/state/items.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideServiceWorker } from '@angular/service-worker';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getStorage, provideStorage} from "@angular/fire/storage";

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
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideStore({
      items: itemsReducer,
    }),
    provideEffects([ItemsEffects]),
    provideStoreDevtools(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};