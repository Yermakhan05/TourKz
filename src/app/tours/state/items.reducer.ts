import { createReducer, on } from '@ngrx/store';
import * as ItemsActions from './items.actions';
import { Country } from "../../models";

export interface ItemsState {
    items: Country[];
    selectedItem: Country | null;

    loadingList: boolean;
    loadingDetails: boolean;

    listError: any;
    detailsError: any;
}

export const initialState: ItemsState = {
    items: [],
    selectedItem: null,

    loadingList: false,
    loadingDetails: false,

    listError: null,
    detailsError: null,
};

export const itemsReducer = createReducer(
    initialState,


    on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
        ...state,
        loadingList: false,
        items
    })),

    on(ItemsActions.loadItemsFailure, (state, { error }) => ({
        ...state,
        loadingList: false,
        listError: error
    })),

    // LOAD ITEM BY ID
    on(ItemsActions.loadItem, state => ({
        ...state,
        loadingDetails: true,
        detailsError: null
    })),

    on(ItemsActions.loadItemSuccess, (state, { item }) => ({
        ...state,
        loadingDetails: false,
        selectedItem: item
    })),
    on(ItemsActions.loadItems, state => ({
        ...state,
        loadingList: true,
        listError: null,
        selectedItem: null
    })),

    on(ItemsActions.loadItemFailure, (state, { error }) => ({
        ...state,
        loadingDetails: false,
        detailsError: error
    }))
);