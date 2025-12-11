import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$: Observable<string> = this.currentLanguageSubject.asObservable();

  private readonly supportedLanguages = ['en', 'ru', 'kz'];
  private readonly defaultLanguage = 'en';

  constructor(private translate: TranslateService) {
    // Get saved language from localStorage or use default
    const savedLanguage = localStorage.getItem('preferredLanguage') || this.defaultLanguage;
    this.setLanguage(savedLanguage);
  }

  setLanguage(lang: string): void {
    if (this.supportedLanguages.includes(lang)) {
      this.translate.use(lang);
      this.currentLanguageSubject.next(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  getLanguageName(lang: string): string {
    const names: { [key: string]: string } = {
      'en': 'English',
      'ru': 'Русский',
      'kz': 'Қазақша'
    };
    return names[lang] || lang;
  }
}

