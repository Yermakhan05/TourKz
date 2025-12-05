import {inject, Injectable} from '@angular/core';
import {
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    user
} from '@angular/fire/auth';
import {Observable, of, switchMap} from 'rxjs';
import {doc, updateDoc, Firestore, setDoc, docData} from "@angular/fire/firestore";
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user$: Observable<any>;

    constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) {
        this.user$ = user(auth);
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
    async uploadProfilePictureBase64(file: Blob | File, uid: string, email: string) {
        const reader = new FileReader();

        return new Promise<string>((resolve, reject) => {
            reader.onload = async () => {
                const base64 = reader.result as string;

                await setDoc(
                    doc(this.firestore, `users/${uid}`),
                    { email, avatarUrl: base64 },
                    { merge: true }
                );

                resolve(base64);
            };

            reader.onerror = reject;
            reader.readAsDataURL(file); // конвертируем Blob/File в Base64
        });
    }
    userProfile$(): Observable<any | null> {
        return user(this.auth).pipe(
            switchMap(authUser => {
                if (!authUser) return of(null);
                const docRef = doc(this.firestore, `users/${authUser.uid}`);
                return docData(docRef, { idField: 'uid' }); // docData из @angular/fire/firestore
            })
        );
    }
}