import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserFormService} from "../services/user-form.service";
@Component({
  selector: 'app-top-bar',
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    FormsModule,
    RouterLinkActive
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

  submitForm(form: any) {
    if (form.invalid) {
      alert('Заполните все обязательные поля!');
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
        window.scrollTo(0, 0); // Прокрутка в самый верх
      }
    });
  }

  constructor(private userFormService: UserFormService,
    private router: Router,
  ) {
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  isContactPage(): boolean {
    return this.router.url === '/contacts';
  }

  isSecondBarPage() {
    return this.router.url === '/tours' || this.router.url === '/login';
  }
}
