import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
    Firestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove, collection, collectionData
} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private firestore = inject(Firestore);
    private authService = inject(AuthService);

    private LOCAL_KEY = 'favorites';

    /** Храним текущий список избранного */
    favorites$ = new BehaviorSubject<string[]>([]);

    constructor() {
        // Если юзер вышел — грузим localStorage
        this.authService.user$.subscribe(user => {
            if (!user) {
                const local = this.loadFromLocal();
                this.favorites$.next(local);
                return;
            }

            this.loadFromFirestore(user.uid);
            this.mergeLocalToFirestore(user.uid);
        });
    }

    /** ========= LOCAL STORAGE ========= */

    private loadFromLocal(): string[] {
        return JSON.parse(localStorage.getItem(this.LOCAL_KEY) || '[]');
    }

    private saveToLocal(list: string[]) {
        localStorage.setItem(this.LOCAL_KEY, JSON.stringify(list));
    }

    /** ========= FIRESTORE ========= */

    private async loadFromFirestore(uid: string) {
        const ref = doc(this.firestore, `favorites/${uid}`);
        const snap = await getDoc(ref);
        let list: string[] = snap.exists() ? snap.data()['items'] : [];

        this.favorites$.next(list);
    }

    private async mergeLocalToFirestore(uid: string) {
        const local = this.loadFromLocal();
        if (local.length === 0) return;

        const ref = doc(this.firestore, `favorites/${uid}`);
        await setDoc(ref, { items: local }, { merge: true });

        localStorage.removeItem(this.LOCAL_KEY);
    }

    /** ========= ADD / REMOVE FAVORITES ========= */

    async toggleFavorite(id: string) {
        const user = await this.authService.getUserOnce();

        if (!user) {
            this.toggleLocal(id);
            return;
        }

        this.toggleFirestore(user.uid, id);
    }

    private toggleLocal(id: string) {
        let list = this.loadFromLocal();

        if (list.includes(id)) {
            list = list.filter(v => v !== id);
        } else {
            list.push(id);
        }

        this.saveToLocal(list);
        this.favorites$.next(list);
    }

    private async toggleFirestore(uid: string, id: string) {
        const ref = doc(this.firestore, `favorites/${uid}`);
        const current = this.favorites$.value;

        if (current.includes(id)) {
            await updateDoc(ref, { items: arrayRemove(id) });
            this.favorites$.next(current.filter(v => v !== id));
        } else {
            await updateDoc(ref, { items: arrayUnion(id) });
            this.favorites$.next([...current, id]);
        }
    }
}