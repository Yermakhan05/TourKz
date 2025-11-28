import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Country} from "../models";
import {map} from "rxjs/operators";




@Injectable({
    providedIn: 'root'
})
export class CountriesService {
    private apiUrl = 'https://restcountries.com/v3.1/';

    constructor(private http: HttpClient) {}

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(this.apiUrl + 'all?fields=name,flags,cca3');
    }
    searchCountries(name: string): Observable<Country[]> {
        if (!name.trim()) {
            return this.getCountries();
        }
        return this.http.get<Country[]>(`${this.apiUrl}name/${name}`);
    }
    getCountryByCode(code: string): Observable<Country> {
        return this.http
            .get<Country[]>(`${this.apiUrl}alpha/${code}`)
            .pipe(
                map(arr => arr[0])   // берем первый элемент
            );
    }
}