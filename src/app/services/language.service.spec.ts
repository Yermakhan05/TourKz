import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [LanguageService]
    });
    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default language', () => {
    expect(service.getCurrentLanguage()).toBeDefined();
  });

  it('should set language', () => {
    service.setLanguage('ru');
    expect(service.getCurrentLanguage()).toBe('ru');
  });

  it('should not set unsupported language', () => {
    const initialLang = service.getCurrentLanguage();
    service.setLanguage('fr');
    expect(service.getCurrentLanguage()).toBe(initialLang);
  });

  it('should get supported languages', () => {
    const languages = service.getSupportedLanguages();
    expect(languages).toContain('en');
    expect(languages).toContain('ru');
    expect(languages).toContain('kz');
  });

  it('should get language name', () => {
    expect(service.getLanguageName('en')).toBe('English');
    expect(service.getLanguageName('ru')).toBe('Русский');
    expect(service.getLanguageName('kz')).toBe('Қазақша');
  });

  it('should save language preference to localStorage', () => {
    service.setLanguage('kz');
    expect(localStorage.getItem('preferredLanguage')).toBe('kz');
  });

  it('should load language preference from localStorage', () => {
    localStorage.setItem('preferredLanguage', 'ru');
    const newService = TestBed.inject(LanguageService);
    expect(newService.getCurrentLanguage()).toBe('ru');
  });

  it('should emit current language changes', (done) => {
    service.currentLanguage$.subscribe(lang => {
      expect(lang).toBeDefined();
      done();
    });
  });
});

