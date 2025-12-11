import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OfflineService } from '../../services/offline.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-offline-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './offline-page.html',
  styleUrl: './offline-page.css'
})
export class OfflinePageComponent implements OnInit, OnDestroy {
  private offlineService = inject(OfflineService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  isOnline = false;
  retryCount = 0;

  ngOnInit(): void {
    this.offlineService.online$
      .pipe(takeUntil(this.destroy$))
      .subscribe(online => {
        this.isOnline = online;
        if (online) {
          // Auto-redirect when back online
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 1000);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkConnection(): void {
    this.retryCount++;
    // Force check by trying to fetch a small resource
    fetch('/favicon.ico', { cache: 'no-store' })
      .then(() => {
        // If successful, trigger online event
        window.dispatchEvent(new Event('online'));
      })
      .catch(() => {
        // Still offline
      });
  }

  goToCachedContent(): void {
    // Navigate to main page which might have cached content
    this.router.navigate(['/main']);
  }
}

