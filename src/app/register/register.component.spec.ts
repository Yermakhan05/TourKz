import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['register', 'loginWithGoogle'], {
      user$: of(null)
    });

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
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

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty user data', () => {
    expect(component.user.email).toBe('');
    expect(component.user.password).toBe('');
    expect(component.user.password_1).toBe('');
  });

  it('should set error when passwords do not match', async () => {
    component.user = {
      email: 'test@test.com',
      password: 'password1',
      password_1: 'password2'
    };

    await component.register();

    expect(component.isIncorrectRegister).toBeTruthy();
  });

  it('should call auth.register when passwords match', async () => {
    authService.register.and.returnValue(Promise.resolve({} as any));
    component.user = {
      email: 'test@test.com',
      password: 'password',
      password_1: 'password'
    };

    await component.register();

    expect(authService.register).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should handle registration errors', async () => {
    authService.register.and.returnValue(Promise.reject({ code: 'auth/email-already-in-use' }));
    component.user = {
      email: 'test@test.com',
      password: 'password',
      password_1: 'password'
    };

    await component.register();

    expect(component.isIncorrectRegister).toBeTruthy();
    expect(component.loading).toBe(false);
  });
});

