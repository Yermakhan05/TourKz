import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';

export const selectItemsState = createFeatureSelector<ItemsState>('items');

export const selectItems = createSelector(
    selectItemsState,
    state => state.items
);

export const selectItemsLoading = createSelector(
    selectItemsState,
    state => state.loadingList
);

export const selectItemsError = createSelector(
    selectItemsState,
    state => state.listError
);

export const selectSelectedItem = createSelector(
    selectItemsState,
    state => state.selectedItem
);

export const selectItemLoading = createSelector(
    selectItemsState,
    state => state.loadingDetails
);

export const selectItemError = createSelector(
    selectItemsState,
    state => state.detailsError
);