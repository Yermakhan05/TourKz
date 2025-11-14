import {Component, OnInit} from '@angular/core';
import {Country} from "../../models";
import {ActivatedRoute} from "@angular/router";
import {CountriesService} from "../../services/countries.service";
import {DecimalPipe, NgIf} from "@angular/common";
import { Location } from '@angular/common';


@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [NgIf, DecimalPipe],
  templateUrl: './tour-details.html',
  styleUrls: ['./tour-details.css']
})
export class TourDetails implements OnInit {

  country: Country | null = null;
  loading = true;
  error = false;

  constructor(
      private route: ActivatedRoute,
      private countriesService: CountriesService,
      private location: Location
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');

    if (code) {
      this.countriesService.getCountryByCode(code).subscribe({
        next: (data) => {
          this.country = data[0];
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
    }
  }

  back() {
    this.location.back();
  }
}