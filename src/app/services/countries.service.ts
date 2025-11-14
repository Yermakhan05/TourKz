import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Country} from "../models";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {
    private apiUrl = 'https://restcountries.com/v3.1/';

    constructor(private http: HttpClient) {}

    getCountries(): Observable<any[]> {
        return this.http.get<Country[]>(this.apiUrl+'all?fields=name,flags,cca3');
    }


    searchCountries(name: string): Observable<any[]> {
        if (!name.trim()) {
            return this.getCountries();
        }
        return this.http.get<Country[]>(`${this.apiUrl}name/${name}`);
    }
    getCountryByCode(code: string): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.apiUrl}alpha/${code}`);
    }
}