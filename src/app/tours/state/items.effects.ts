import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {CountriesService} from "../../services/countries.service";
import {
    loadItem,
    loadItemFailure,
    loadItems,
    loadItemsFailure,
    loadItemsSuccess,
    loadItemSuccess
} from "./items.actions";


console.log('ItemsEffects file loaded');

@Injectable()
export class ItemsEffects {
    private itemsService = inject(CountriesService);
    private actions$ = inject(Actions);

    loadItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadItems),
            switchMap(({ query }) =>
                this.itemsService.searchCountries(query ?? '').pipe(
                    map(items => loadItemsSuccess({ items })),
                    catchError(err => of(loadItemsFailure({ error: err })))
                )
            )
        )
    );

    loadItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadItem),
            switchMap(({ id }) =>
                this.itemsService.getCountryByCode(String(id)).pipe(
                    map(item => loadItemSuccess({ item })),
                    catchError(err => of(loadItemFailure({ error: err })))
                )
            )
        )
    );
}