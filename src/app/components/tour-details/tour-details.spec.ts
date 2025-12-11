import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourDetails } from './tour-details';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { itemsReducer } from '../../tours/state/items.reducer';
import { ItemsEffects } from '../../tours/state/items.effects';
import { of } from 'rxjs';
import { Country } from '../../models';

describe('TourDetails', () => {
  let component: TourDetails;
  let fixture: ComponentFixture<TourDetails>;
  let store: jasmine.SpyObj<Store>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const mockCountry: Country = {
      name: { common: 'Test', official: 'Test Country' },
      flags: { png: 'test.png' },
      cca3: 'TST',
      region: 'Test Region'
    } as Country;

    storeSpy.select.and.returnValue(of(mockCountry));

    await TestBed.configureTestingModule({
      imports: [
        TourDetails,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Location, useValue: locationSpy },
        provideStore({ items: itemsReducer }),
        provideEffects([ItemsEffects])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TourDetails);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have country$ observable', () => {
    expect(component.country$).toBeDefined();
  });

  it('should have back method', () => {
    expect(typeof component.back).toBe('function');
    component.back();
    expect(location.back).toHaveBeenCalled();
  });

  it('should dispatch loadItem on init', () => {
    expect(store.dispatch).toHaveBeenCalled();
  });
});

