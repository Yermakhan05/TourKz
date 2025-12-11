import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Favorites } from './favorites';
import { FavoritesService } from '../../services/favorites.service';
import { CountriesService } from '../../services/countries.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Country } from '../../models';

describe('Favorites', () => {
  let component: Favorites;
  let fixture: ComponentFixture<Favorites>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let countriesService: jasmine.SpyObj<CountriesService>;

  beforeEach(async () => {
    const favoritesSpy = jasmine.createSpyObj('FavoritesService', ['toggleFavorite'], {
      favorites$: of(['TST1', 'TST2'])
    });
    const countriesSpy = jasmine.createSpyObj('CountriesService', ['getCountriesByCode']);

    const mockCountries: Country[] = [
      { name: { common: 'Test1' }, flags: { svg: 'test1.svg' }, cca3: 'TST1' } as Country,
      { name: { common: 'Test2' }, flags: { svg: 'test2.svg' }, cca3: 'TST2' } as Country
    ];
    countriesSpy.getCountriesByCode.and.returnValue(of(mockCountries));

    await TestBed.configureTestingModule({
      imports: [
        Favorites,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: FavoritesService, useValue: favoritesSpy },
        { provide: CountriesService, useValue: countriesSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Favorites);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    countriesService = TestBed.inject(CountriesService) as jasmine.SpyObj<CountriesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading state', () => {
    expect(component.loading).toBeDefined();
  });

  it('should toggle favorite', () => {
    component.toggle('test-id');
    expect(favoritesService.toggleFavorite).toHaveBeenCalledWith('test-id');
  });

  it('should load favorite countries', (done) => {
    component.favoriteCountries$.subscribe(countries => {
      expect(countries).toBeDefined();
      done();
    });
  });
});
