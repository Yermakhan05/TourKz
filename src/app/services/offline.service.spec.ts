import { TestBed } from '@angular/core/testing';
import { OfflineService } from './offline.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('OfflineService', () => {
  let service: OfflineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with navigator.onLine status', () => {
    expect(service.online$.value).toBe(navigator.onLine);
  });

  it('should update online status when online event fires', fakeAsync(() => {
    const initialValue = service.online$.value;
    window.dispatchEvent(new Event('online'));
    tick();
    expect(service.online$.value).toBe(true);
  }));

  it('should update online status when offline event fires', fakeAsync(() => {
    window.dispatchEvent(new Event('offline'));
    tick();
    expect(service.online$.value).toBe(false);
  }));

  it('should check connection quality', async () => {
    const quality = await service.checkConnectionQuality();
    expect(['online', 'slow', 'offline']).toContain(quality);
  });

  it('should check connection manually', async () => {
    const result = await service.checkConnection();
    expect(typeof result).toBe('boolean');
  });

  it('should check if service worker is available', () => {
    const result = service.isServiceWorkerAvailable();
    expect(typeof result).toBe('boolean');
  });

  it('should update connection quality when online', fakeAsync(() => {
    service.online$.next(true);
    tick();
    expect(['online', 'slow', 'offline']).toContain(service.connectionQuality$.value);
  }));
});

