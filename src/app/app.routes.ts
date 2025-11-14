import { Routes } from '@angular/router';
import {About} from "./about/about";
import {ContactsComponent} from "./contacts/contacts.component";
import {Tours} from "./tours/tours";
import {RegisterComponent} from "./register/register.component";
import {TourDetails} from "./components/tour-details/tour-details";

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: About },
    { path: 'tours', component: Tours },
    { path: 'contacts', component: ContactsComponent },
    { path: 'login', component: RegisterComponent },
    { path: 'tours/:code', component: TourDetails },
    { path: '**', redirectTo: '' }
];
