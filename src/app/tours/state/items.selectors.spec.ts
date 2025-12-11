import { itemsReducer, ItemsState, initialState } from './items.reducer';
import * as fromSelectors from './items.selectors';
import * as ItemsActions from './items.actions';
import { Country } from '../../models';

describe('ItemsSelectors', () => {
  const mockCountry: Country = {
    name: { common: 'Test Country' },
    flags: { svg: 'test.svg' },
    cca3: 'TST'
  } as Country;

  const createState = (overrides?: Partial<ItemsState>): ItemsState => ({
    ...initialState,
    ...overrides
  });

  it('should select items', () => {
    const state = createState({ items: [mockCountry] });
    const result = fromSelectors.selectItems.projector(state);
    expect(result).toEqual([mockCountry]);
  });

  it('should select loading state', () => {
    const state = createState({ loadingList: true });
    const result = fromSelectors.selectItemsLoading.projector(state);
    expect(result).toBe(true);
  });

  it('should select error state', () => {
    const error = { message: 'Error' };
    const state = createState({ listError: error });
    const result = fromSelectors.selectItemsError.projector(state);
    expect(result).toEqual(error);
  });

  it('should select selected item', () => {
    const state = createState({ selectedItem: mockCountry });
    const result = fromSelectors.selectSelectedItem.projector(state);
    expect(result).toEqual(mockCountry);
  });

  it('should select item loading state', () => {
    const state = createState({ loadingDetails: true });
    const result = fromSelectors.selectItemLoading.projector(state);
    expect(result).toBe(true);
  });

  it('should select item error state', () => {
    const error = { message: 'Error' };
    const state = createState({ detailsError: error });
    const result = fromSelectors.selectItemError.projector(state);
    expect(result).toEqual(error);
  });
});

