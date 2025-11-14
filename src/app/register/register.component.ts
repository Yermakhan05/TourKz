import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router: Router) {}
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  credentials = { username: '', password: '' };

  login() {
  }

  user = { username: '', email: '', password: '',
    password_1: '',
  };
  isIncorrect: boolean = false;
  isIncorrectRegister: boolean = false;

  register() {
  }
}
