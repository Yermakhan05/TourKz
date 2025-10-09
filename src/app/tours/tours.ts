import { Component } from '@angular/core';
import {CountriesService} from "../services/countries.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tours',
  imports: [CommonModule],
  templateUrl: './tours.html',
  standalone: true,
  styleUrl: './tours.css'
})
export class Tours {
  countries: any[] = [];
  isLoading = false;

  constructor(private countriesService: CountriesService) {}

  loadCountries() {
    this.isLoading = true;
    this.countriesService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
