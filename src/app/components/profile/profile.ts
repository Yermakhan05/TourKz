import {Component, inject} from '@angular/core';
import {AsyncPipe, NgIf, UpperCasePipe} from "@angular/common";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    UpperCasePipe
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private authService = inject(AuthService);

  user$ = this.authService.user$;
  loading = true;

  constructor(private router: Router) {
    this.user$.subscribe(() => {
      this.loading = false;
    });
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/main']);
  }
}