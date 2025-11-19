import { Routes } from '@angular/router';
import {About} from "./about/about";
import {ContactsComponent} from "./contacts/contacts.component";
import {Tours} from "./tours/tours";
import {RegisterComponent} from "./register/register.component";
import {TourDetails} from "./components/tour-details/tour-details";
import {AuthGuard} from "./services/auth.guard";
import {Profile} from "./components/profile/profile";
import {Login} from "./components/login/login";

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: About },
    { path: 'tours', component: Tours },
    { path: 'contacts', component: ContactsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: Login },
    { path: 'profile', component: Profile, canActivate: [AuthGuard] },
    { path: 'tours/:code', component: TourDetails },
    { path: '**', redirectTo: '' },
];
