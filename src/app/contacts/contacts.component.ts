import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-contacts',
  imports: [
    FormsModule,
    NgIf
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

  constructor() {
  }

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
  }
}
