import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserFormService} from "../services/user-form.service";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from "../services/language.service";
@Component({
  selector: 'app-top-bar',
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    FormsModule,
    RouterLinkActive,
    AsyncPipe,
    TranslateModule,
    NgForOf
  ],
  templateUrl: './top-bar.component.html',
  standalone: true,
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit{
  isMenuOpen = false;
  isForm: boolean = false;
  name = '';
  email = '';
  phone = '';
  comment = '';
  user$!: Observable<any>;
  currentLanguage = 'en';
  supportedLanguages = ['en', 'ru', 'kz'];

  constructor(
    private userFormService: UserFormService,
    private router: Router, 
    public auth: AuthService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.user$ = this.auth.user$;
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }

  getLanguageName(lang: string): string {
    return this.languageService.getLanguageName(lang);
  }

  submitForm(form: any) {
    if (form.invalid) {
      this.translate.get('TOP_BAR.FILL_REQUIRED').subscribe((text: string) => {
        alert(text);
      });
      return;
    }
    const formData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      comment: this.comment,
      status: 'pending'
    };

    this.userFormService.submitForm(formData).subscribe({
      next: (response) => {
        alert(response.message);
        this.isForm = false
      },
      error: (error) => console.error('Ошибка:', error)
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login'])
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  isContactPage(): boolean {
    return this.router.url === '/contacts';
  }

  isSecondBarPage() {
    return this.router.url.startsWith('/tours') || this.router.url === '/login';
  }
}
