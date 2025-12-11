// src/app/services/profile.service.ts
import { Injectable } from '@angular/core';

// AngularFire imports — обязательно из @angular/fire/*
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';

import { Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    // будем хранить auth-user observable в конструкторе
    private authUser$!: Observable<any | null>;

    constructor(
        private auth: Auth,
        private firestore: Firestore,
    ) {
        // ИНИЦИАЛИЗАЦИЯ В КОНСТРУКТОРЕ — чтобы не вызывать AngularFire вне DI-контекста
        this.authUser$ = user(this.auth);
    }

    // Возвращает observable профиля из users/{uid}
    profile$(): Observable<any | null> {
        return this.authUser$.pipe(
            switchMap(authUser => {
                if (!authUser) return of(null);

                // Убедись: doc и docData — из '@angular/fire/firestore'
                const ref = doc(this.firestore, `users/${authUser.uid}`);
                return docData(ref, { idField: 'uid' });
            })
        );
    }

    // Загружает аватар как base64 в документ users/{uid}
    uploadAvatarBase64(file: Blob | File, uid: string): Promise<string> {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = async () => {
                try {
                    let base64 = reader.result as string;
                    base64 = base64.replace(/\r?\n|\r/g, '');

                    await setDoc(
                        doc(this.firestore, `users/${uid}`),
                        { avatarBase64: base64 },
                        { merge: true }
                    );

                    resolve(base64);
                } catch (err) {
                    reject(err);
                }
            };

            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    }

    // Одноразовое получение текущего auth user
    async getCurrentUser(): Promise<any | null> {
        return new Promise(resolve => {
            const sub = this.authUser$.subscribe(u => {
                resolve(u);
                sub.unsubscribe();
            });
        });
    }
}
