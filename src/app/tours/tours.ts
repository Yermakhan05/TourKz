import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../services/countries.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Country} from "../models";
import {debounceTime, Subject, switchMap} from "rxjs";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-tours',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tours.html',
  standalone: true,
  styleUrl: './tours.css'
})
export class Tours implements OnInit {
  countries: Country[] = [];
  private searchSubject = new Subject<string>();
  search: string = '';

  constructor(
      private countriesService: CountriesService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  searchResult(term: string) {
    this.searchSubject.next(term);

    // сохранить в URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: term || null },
      queryParamsHandling: 'merge'
    });
  }

  ngOnInit() {
    // 1) слушаем subject
    this.searchSubject
        .pipe(
            debounceTime(200),
            switchMap(term => this.countriesService.searchCountries(term))
        )
        .subscribe(data => this.countries = data);

    // 2) читаем query при загрузке
    this.route.queryParams.subscribe(params => {
      const term = params['search'] || '';

      // чтобы input показывал текст
      this.search = term;

      // чтобы сразу искать
      this.searchSubject.next(term);
    });

    // 3) загружаем все страны если нет search
    this.countriesService.getCountries()
        .subscribe(data => this.countries = data);
  }
}
