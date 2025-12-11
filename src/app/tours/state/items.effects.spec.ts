import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ItemsEffects } from './items.effects';
import { CountriesService } from '../../services/countries.service';
import { loadItems, loadItemsSuccess, loadItemsFailure, loadItem, loadItemSuccess, loadItemFailure } from './items.actions';
import { Country } from '../../models';

describe('ItemsEffects', () => {
  let actions$: Observable<any>;
  let effects: ItemsEffects;
  let countriesService: jasmine.SpyObj<CountriesService>;

  beforeEach(() => {
    const countriesSpy = jasmine.createSpyObj('CountriesService', ['searchCountries', 'getCountryByCode']);

    TestBed.configureTestingModule({
      providers: [
        ItemsEffects,
        provideMockActions(() => actions$),
        { provide: CountriesService, useValue: countriesSpy }
      ]
    });

    effects = TestBed.inject(ItemsEffects);
    countriesService = TestBed.inject(CountriesService) as jasmine.SpyObj<CountriesService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load items successfully', (done) => {
    const mockCountries: Country[] = [
      { name: { common: 'Test' }, flags: { svg: 'test.svg' }, cca3: 'TST' } as Country
    ];
    countriesService.searchCountries.and.returnValue(of(mockCountries));

    actions$ = of(loadItems({ query: 'test' }));

    effects.loadItems$.subscribe(action => {
      expect(action).toEqual(loadItemsSuccess({ items: mockCountries }));
      expect(countriesService.searchCountries).toHaveBeenCalledWith('test');
      done();
    });
  });

  it('should handle load items failure', (done) => {
    const error = { message: 'Error' };
    countriesService.searchCountries.and.returnValue(throwError(() => error));

    actions$ = of(loadItems({ query: 'test' }));

    effects.loadItems$.subscribe(action => {
      expect(action).toEqual(loadItemsFailure({ error }));
      done();
    });
  });

  it('should load item successfully', (done) => {
    const mockCountry: Country = { name: { common: 'Test' }, flags: { svg: 'test.svg' }, cca3: 'TST' } as Country;
    countriesService.getCountryByCode.and.returnValue(of(mockCountry));

    actions$ = of(loadItem({ id: 'TST' }));

    effects.loadItem$.subscribe(action => {
      expect(action).toEqual(loadItemSuccess({ item: mockCountry }));
      expect(countriesService.getCountryByCode).toHaveBeenCalledWith('TST');
      done();
    });
  });

  it('should handle load item failure', (done) => {
    const error = { message: 'Error' };
    countriesService.getCountryByCode.and.returnValue(throwError(() => error));

    actions$ = of(loadItem({ id: 'TST' }));

    effects.loadItem$.subscribe(action => {
      expect(action).toEqual(loadItemFailure({ error }));
      done();
    });
  });
});

