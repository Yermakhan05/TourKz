import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', [], {
      user$: of(null)
    });
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is authenticated', (done) => {
    Object.defineProperty(authService, 'user$', {
      value: of({ uid: '123', email: 'test@test.com' })
    });
    router.createUrlTree.and.returnValue('/login' as any);

    guard.canActivate().subscribe(result => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should redirect to login when user is not authenticated', (done) => {
    Object.defineProperty(authService, 'user$', {
      value: of(null)
    });
    const urlTree = '/login' as any;
    router.createUrlTree.and.returnValue(urlTree);

    guard.canActivate().subscribe(result => {
      expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
      expect(result).toBe(urlTree);
      done();
    });
  });
});

