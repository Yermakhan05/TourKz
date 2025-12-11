import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountriesService } from './countries.service';
import { Country } from '../models';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService]
    });
    service = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all countries', () => {
    const mockCountries: Country[] = [
      { name: { common: 'Test Country' }, flags: { svg: 'test.svg' }, cca3: 'TST' } as Country
    ];

    service.getCountries().subscribe(countries => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should search countries by name', () => {
    const mockCountries: Country[] = [
      { name: { common: 'Test Country' }, flags: { svg: 'test.svg' }, cca3: 'TST' } as Country
    ];

    service.searchCountries('test').subscribe(countries => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/name/test');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should get all countries when search is empty', () => {
    const mockCountries: Country[] = [];

    service.searchCountries('').subscribe(countries => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all?fields=name,flags,cca3');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should get country by code', () => {
    const mockCountry: Country = { name: { common: 'Test' }, flags: { svg: 'test.svg' }, cca3: 'TST' } as Country;

    service.getCountryByCode('TST').subscribe(country => {
      expect(country).toEqual(mockCountry);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/alpha/TST');
    expect(req.request.method).toBe('GET');
    req.flush([mockCountry]);
  });

  it('should get countries by codes', () => {
    const mockCountries: Country[] = [
      { name: { common: 'Test1' }, flags: { svg: 'test1.svg' }, cca3: 'TST1' } as Country,
      { name: { common: 'Test2' }, flags: { svg: 'test2.svg' }, cca3: 'TST2' } as Country
    ];

    service.getCountriesByCode(['TST1', 'TST2']).subscribe(countries => {
      expect(countries.length).toBe(2);
    });

    const req1 = httpMock.expectOne('https://restcountries.com/v3.1/alpha/TST1');
    const req2 = httpMock.expectOne('https://restcountries.com/v3.1/alpha/TST2');
    req1.flush([mockCountries[0]]);
    req2.flush([mockCountries[1]]);
  });

  it('should return empty array for empty codes', () => {
    service.getCountriesByCode([]).subscribe(countries => {
      expect(countries).toEqual([]);
    });
  });
});

