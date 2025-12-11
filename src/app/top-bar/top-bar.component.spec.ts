import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { UserFormService } from '../services/user-form.service';
import { LanguageService } from '../services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let languageService: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      user$: of(null)
    });
    const languageSpy = jasmine.createSpyObj('LanguageService', ['setLanguage', 'getCurrentLanguage', 'getLanguageName'], {
      currentLanguage$: of('en')
    });
    languageSpy.getCurrentLanguage.and.returnValue('en');
    languageSpy.getLanguageName.and.returnValue('English');

    await TestBed.configureTestingModule({
      imports: [
        TopBarComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: UserFormService, useValue: jasmine.createSpyObj('UserFormService', ['submitForm']) },
        { provide: LanguageService, useValue: languageSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    languageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    const initialValue = component.isMenuOpen;
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(!initialValue);
  });

  it('should call logout', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should change language', () => {
    component.changeLanguage('ru');
    expect(languageService.setLanguage).toHaveBeenCalledWith('ru');
  });

  it('should get language name', () => {
    const name = component.getLanguageName('en');
    expect(languageService.getLanguageName).toHaveBeenCalledWith('en');
    expect(name).toBe('English');
  });
});

