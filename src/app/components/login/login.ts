import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.html',
  standalone: true,
  styleUrl: './login.css'
})
export class Login {
  loading = false;
  error: string | null = null;

  credentials = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.error = null;
    this.loading = true;

    try {
      await this.auth.login(this.credentials.email, this.credentials.password);
      await this.router.navigate(['/profile']);
    } catch (e: any) {
      console.error(e);

      if (e.code === 'auth/user-not-found') {
        this.error = 'User not found';
      } else if (e.code === 'auth/wrong-password') {
        this.error = 'Incorrect password';
      } else if (e.code === 'auth/invalid-email') {
        this.error = 'Invalid email address';
      } else {
        this.error = 'Login failed. Try again.';
      }

    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    try {
      await this.auth.loginWithGoogle();
      await this.router.navigate(['/profile']);
    } catch (e) {
      console.error(e);
      this.error = e as string;
    }
  }
}
