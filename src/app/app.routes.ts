import { Routes } from '@angular/router';
import {About} from "./about/about";
import {ContactsComponent} from "./contacts/contacts.component";
import {Tours} from "./tours/tours";

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: About },
    { path: 'tours', component: Tours },
    { path: 'contacts', component: ContactsComponent },
];
