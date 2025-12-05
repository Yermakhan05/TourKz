import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgIf, UpperCasePipe} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";


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
export class Profile implements OnInit{
  private authService = inject(AuthService);
  user$ = this.authService.user$;
  loading: boolean = false;
  userProfile$!: Observable<any | null>;

  async selectFile(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const compressed = await this.compressImage(file);
    const user = await this.authService.getUserOnce();

    await this.authService.uploadProfilePictureBase64(
        compressed,
        user.uid,
        user.email
    );
  }
  ngOnInit() {
    this.userProfile$ = this.authService.userProfile$();
  }

  compressImage(file: File): Promise<Blob> {
    return new Promise(resolve => {
      const worker = new Worker(new URL('./compress.worker', import.meta.url));
      worker.postMessage(file);
      worker.onmessage = ({ data }) => resolve(data as Blob);
    });
  }

  constructor(private router: Router) {}

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/main']);
  }
}