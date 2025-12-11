import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { of, throwError } from 'rxjs';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'loginWithGoogle'], {
      user$: of(null)
    });

    await TestBed.configureTestingModule({
      imports: [
        Login,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty credentials', () => {
    expect(component.credentials.email).toBe('');
    expect(component.credentials.password).toBe('');
  });

  it('should call auth.login on login', async () => {
    authService.login.and.returnValue(Promise.resolve({} as any));
    component.credentials = { email: 'test@test.com', password: 'password' };
    
    await component.login();
    
    expect(authService.login).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should set error on login failure', async () => {
    authService.login.and.returnValue(Promise.reject({ code: 'auth/user-not-found' }));
    
    await component.login();
    
    expect(component.error).toBeTruthy();
    expect(component.loading).toBe(false);
  });

  it('should call loginWithGoogle', async () => {
    authService.loginWithGoogle.and.returnValue(Promise.resolve({} as any));
    
    await component.loginWithGoogle();
    
    expect(authService.loginWithGoogle).toHaveBeenCalled();
  });
});

