import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tours } from './tours';
import { Store } from '@ngrx/store';
import { FavoritesService } from '../services/favorites.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { itemsReducer } from './state/items.reducer';
import { ItemsEffects } from './state/items.effects';
import { of } from 'rxjs';

describe('Tours', () => {
  let component: Tours;
  let fixture: ComponentFixture<Tours>;
  let store: jasmine.SpyObj<Store>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const favoritesSpy = jasmine.createSpyObj('FavoritesService', ['toggleFavorite'], {
      favorites$: of([])
    });

    storeSpy.select.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        Tours,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: FavoritesService, useValue: favoritesSpy },
        provideStore({ items: itemsReducer }),
        provideEffects([ItemsEffects])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tours);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    favoritesService = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.page).toBe(1);
    expect(component.pageSize).toBe(12);
    expect(component.search).toBe('');
  });

  it('should toggle favorite', () => {
    component.toggle('test-id');
    expect(favoritesService.toggleFavorite).toHaveBeenCalledWith('test-id');
  });

  it('should change page', () => {
    spyOn(component['router'], 'navigate');
    component.changePage(2);
    expect(component['router'].navigate).toHaveBeenCalled();
  });

  it('should change page size', () => {
    spyOn(component['router'], 'navigate');
    const event = { target: { value: '20' } } as any;
    component.changePageSize(event);
    expect(component['router'].navigate).toHaveBeenCalled();
  });
});

