import { inject, Injectable } from '@angular/core';
import {
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    user
} from '@angular/fire/auth';

import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
    user$: Observable<any>;
    private auth = inject(Auth);

    constructor() {
        this.user$ = user(this.auth);
    }

    register(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logout() {
        return this.auth.signOut();
    }
    loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this.auth, provider);
    }
    async getUserOnce() {
        return new Promise<any>(resolve => {
            const sub = this.user$.subscribe(user => {
                resolve(user);
                sub.unsubscribe();
            });
        });
    }
}