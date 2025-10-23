import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-top-bar',
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    FormsModule
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


    if (form.valid) {
        alert(`Form submitted successfully!\nName: ${this.name}\nEmail: ${this.email}`);
        form.resetForm();
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Прокрутка в самый верх
      }
    });
  }

  constructor(
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
    return this.router.url === '/tours';
  }
}
