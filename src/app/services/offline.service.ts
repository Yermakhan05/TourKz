// offline.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, of, interval } from 'rxjs';
import { mapTo, switchMap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OfflineService {
    public online$ = new BehaviorSubject<boolean>(navigator.onLine);
    public connectionQuality$ = new BehaviorSubject<'online' | 'slow' | 'offline'>(
        navigator.onLine ? 'online' : 'offline'
    );

    private checkInterval = 30000; // Check every 30 seconds

    constructor() {
        const online = fromEvent(window, 'online').pipe(mapTo(true));
        const offline = fromEvent(window, 'offline').pipe(mapTo(false));
        
        merge(online, offline, of(navigator.onLine))
            .subscribe(isOnline => {
                this.online$.next(isOnline);
                this.connectionQuality$.next(isOnline ? 'online' : 'offline');
            });

        // Periodically check connection quality
        if (navigator.onLine) {
            this.startConnectionMonitoring();
        }

        // Restart monitoring when coming back online
        this.online$.subscribe(isOnline => {
            if (isOnline) {
                this.startConnectionMonitoring();
            }
        });
    }

    private startConnectionMonitoring(): void {
        interval(this.checkInterval)
            .pipe(
                switchMap(() => this.checkConnectionQuality())
            )
            .subscribe(quality => {
                if (this.online$.value) {
                    this.connectionQuality$.next(quality);
                }
            });
    }

    private checkConnectionQuality(): Promise<'online' | 'slow' | 'offline'> {
        return new Promise((resolve) => {
            if (!navigator.onLine) {
                resolve('offline');
                return;
            }

            const startTime = performance.now();
            const timeout = 5000; // 5 second timeout

            fetch('/favicon.ico', { 
                cache: 'no-store',
                method: 'HEAD'
            })
                .then(() => {
                    const duration = performance.now() - startTime;
                    if (duration > 3000) {
                        resolve('slow');
                    } else {
                        resolve('online');
                    }
                })
                .catch(() => {
                    resolve('offline');
                });

            // Fallback timeout
            setTimeout(() => resolve('slow'), timeout);
        });
    }

    /**
     * Manually check if connection is available
     */
    async checkConnection(): Promise<boolean> {
        if (!navigator.onLine) {
            return false;
        }

        try {
            const response = await fetch('/favicon.ico', {
                cache: 'no-store',
                method: 'HEAD',
                signal: AbortSignal.timeout(5000)
            });
            return response.ok;
        } catch {
            return false;
        }
    }

    /**
     * Check if service worker is available
     */
    isServiceWorkerAvailable(): boolean {
        return 'serviceWorker' in navigator;
    }
}