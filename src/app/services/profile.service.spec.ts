import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth())
      ]
    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have profile$ method', () => {
    expect(typeof service.profile$).toBe('function');
  });

  it('should have uploadAvatarBase64 method', () => {
    expect(typeof service.uploadAvatarBase64).toBe('function');
  });

  it('should have getCurrentUser method', () => {
    expect(typeof service.getCurrentUser).toBe('function');
  });

  it('should return observable from profile$', () => {
    const result = service.profile$();
    expect(result).toBeDefined();
    expect(result.subscribe).toBeDefined();
  });
});

