import { Component, OnInit, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AsyncPipe, NgIf } from '@angular/common';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private profileService = inject(ProfileService);
  private authService = inject(AuthService)

  user$ = this.authService.user$
  profile$ = this.profileService.profile$();

  ngOnInit() {}

  async selectFile(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    if (file.size > 30 * 1024) {
      alert('Максимум 30 KB!');
      return;
    }

    const user = await this.profileService.getCurrentUser();

    await this.profileService.uploadAvatarBase64(file, user.uid);
  }

  public logout() {
    this.authService.logout()
  }
}
