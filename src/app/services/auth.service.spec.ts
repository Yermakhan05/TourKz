import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth())
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have user$ observable', () => {
    expect(service.user$).toBeDefined();
  });

  it('should have register method', () => {
    expect(typeof service.register).toBe('function');
  });

  it('should have login method', () => {
    expect(typeof service.login).toBe('function');
  });

  it('should have logout method', () => {
    expect(typeof service.logout).toBe('function');
  });

  it('should have loginWithGoogle method', () => {
    expect(typeof service.loginWithGoogle).toBe('function');
  });

  it('should have getUserOnce method', () => {
    expect(typeof service.getUserOnce).toBe('function');
  });
});

