import { itemsReducer, initialState } from './items.reducer';
import * as ItemsActions from './items.actions';
import { Country } from '../../models';

describe('ItemsReducer', () => {
  const mockCountry: Country = {
    name: { common: 'Test Country' },
    flags: { svg: 'test.svg' },
    cca3: 'TST'
  } as Country;

  it('should return initial state', () => {
    const action = { type: 'Unknown' };
    const state = itemsReducer(initialState, action as any);
    expect(state).toBe(initialState);
  });

  it('should handle loadItems', () => {
    const action = ItemsActions.loadItems({ query: 'test' });
    const state = itemsReducer(initialState, action);
    expect(state.loadingList).toBe(true);
    expect(state.listError).toBeNull();
  });

  it('should handle loadItemsSuccess', () => {
    const action = ItemsActions.loadItemsSuccess({ items: [mockCountry] });
    const state = itemsReducer(initialState, action);
    expect(state.loadingList).toBe(false);
    expect(state.items).toEqual([mockCountry]);
  });

  it('should handle loadItemsFailure', () => {
    const error = { message: 'Error' };
    const action = ItemsActions.loadItemsFailure({ error });
    const state = itemsReducer(initialState, action);
    expect(state.loadingList).toBe(false);
    expect(state.listError).toEqual(error);
  });

  it('should handle loadItem', () => {
    const action = ItemsActions.loadItem({ id: 'TST' });
    const state = itemsReducer(initialState, action);
    expect(state.loadingDetails).toBe(true);
    expect(state.detailsError).toBeNull();
  });

  it('should handle loadItemSuccess', () => {
    const action = ItemsActions.loadItemSuccess({ item: mockCountry });
    const state = itemsReducer(initialState, action);
    expect(state.loadingDetails).toBe(false);
    expect(state.selectedItem).toEqual(mockCountry);
  });

  it('should handle loadItemFailure', () => {
    const error = { message: 'Error' };
    const action = ItemsActions.loadItemFailure({ error });
    const state = itemsReducer(initialState, action);
    expect(state.loadingDetails).toBe(false);
    expect(state.detailsError).toEqual(error);
  });
});

