import { createAction, props } from '@ngrx/store';
import { Country } from "../../models";

export const loadItems = createAction(
    '[Items] Load Items',
    props<{ query?: string }>()
);

export const loadItemsSuccess = createAction(
    '[Items] Load Items Success',
    props<{ items: Country[] }>()
);

export const loadItemsFailure = createAction(
    '[Items] Load Items Failure',
    props<{ error: any }>()
);

// LOAD ITEM BY ID
export const loadItem = createAction(
    '[Items] Load Item',
    props<{ id: string | number }>()
);

export const loadItemSuccess = createAction(
    '[Items] Load Item Success',
    props<{ item: Country }>()
);

export const loadItemFailure = createAction(
    '[Items] Load Item Failure',
    props<{ error: any }>()
);