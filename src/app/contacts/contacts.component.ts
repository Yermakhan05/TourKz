import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UserFormService} from "../services/user-form.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-contacts',
  imports: [
    FormsModule,
    NgIf,
    TranslateModule
  ],
  templateUrl: './contacts.component.html',
  standalone: true,
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  name = '';
  email = '';
  phone = '';
  comment = '';

  constructor(
    private userFormService: UserFormService,
    private translate: TranslateService
  ) {
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
        location.reload();
      },
      error: (error) => console.error('Ошибка:', error)
    });
  }
}
