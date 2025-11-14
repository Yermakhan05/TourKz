import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../services/countries.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Country} from "../models";
import {debounceTime, Subject, switchMap} from "rxjs";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-tours',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tours.html',
  standalone: true,
  styleUrl: './tours.css'
})
export class Tours implements OnInit{
  countries: Country[] = [];
  private searchSubject = new Subject<string>();

  constructor(private countriesService: CountriesService) {}

  searchResult(term: string) {
    this.searchSubject.next(term);
  }

  ngOnInit() {
    this.searchSubject
        .pipe(
            debounceTime(100),
            switchMap((term) => this.countriesService.searchCountries(term))
        )
        .subscribe((data) => {
          this.countries = data;
        });

    // загрузить все страны при старте
    this.countriesService.getCountries().subscribe((data) => (this.countries = data));
  }
}
