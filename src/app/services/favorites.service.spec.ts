import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { AuthService } from './auth.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserOnce'], {
      user$: of(null)
    });

    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        { provide: AuthService, useValue: authSpy },
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth())
      ]
    });
    service = TestBed.inject(FavoritesService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have favorites$ observable', () => {
    expect(service.favorites$).toBeDefined();
  });

  it('should initialize with empty favorites', () => {
    expect(service.favorites$.value).toEqual([]);
  });

  it('should toggle favorite when user is not logged in', async () => {
    authService.getUserOnce.and.returnValue(Promise.resolve(null));
    const testId = 'test-id';
    
    await service.toggleFavorite(testId);
    expect(service.favorites$.value).toContain(testId);
    
    await service.toggleFavorite(testId);
    expect(service.favorites$.value).not.toContain(testId);
  });

  it('should save to localStorage when user is not logged in', async () => {
    authService.getUserOnce.and.returnValue(Promise.resolve(null));
    const testId = 'test-id';
    
    await service.toggleFavorite(testId);
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(stored).toContain(testId);
  });
});

