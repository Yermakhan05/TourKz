import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from "../services/auth.service";

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
  user = {
    email: '',
    password: '',
    password_1: ''
  };

  isIncorrectRegister: string | null = null;
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    this.isIncorrectRegister = null;

    if (this.user.password !== this.user.password_1) {
      this.isIncorrectRegister = "Passwords don't match";
      return;
    }

    this.loading = true;

    try {
      await this.auth.register(this.user.email, this.user.password);
      await this.router.navigate(['/profile']);
    } catch (error: any) {
      // В зависимости от ошибки можно показать более информативное сообщение
      if (error.code === 'auth/email-already-in-use') {
        this.isIncorrectRegister = "Email is already in use";
      } else if (error.code === 'auth/invalid-email') {
        this.isIncorrectRegister = "Invalid email";
      } else if (error.code === 'auth/weak-password') {
        this.isIncorrectRegister = "Password should be at least 6 characters";
      } else {
        this.isIncorrectRegister = "Registration failed. Please try again.";
      }
    } finally {
      this.loading = false;
    }
  }
  async registerWithGoogle() {
    try {
      const user = await this.auth.loginWithGoogle();
      console.log("User registered:", user);
      await this.router.navigate(['/profile']);
    } catch (e) {
      console.error(e);
    }
  }
}
