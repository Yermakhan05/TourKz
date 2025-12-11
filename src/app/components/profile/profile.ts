import { Component, OnInit, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AsyncPipe, NgIf } from '@angular/common';
import {AuthService} from "../../services/auth.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf, TranslateModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private translate = inject(TranslateService);

  user$ = this.authService.user$
  profile$ = this.profileService.profile$();

  constructor(private router: Router) {
  }

  ngOnInit() {}

  async selectFile(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    if (file.size > 30 * 1024) {
      this.translate.get('PROFILE.MAX_SIZE').subscribe((text: string) => {
        alert(text);
      });
      return;
    }

    const user = await this.profileService.getCurrentUser();

    await this.profileService.uploadAvatarBase64(file, user.uid);
  }

  public logout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }
}
