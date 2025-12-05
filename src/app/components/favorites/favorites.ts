import {Component, inject, OnInit} from '@angular/core';
import {FavoritesService} from "../../services/favorites.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CountriesService} from "../../services/countries.service";
import {catchError, Observable, of, switchMap, tap} from "rxjs";
import {Country} from "../../models";


@Component({
  selector: 'app-favorites',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './favorites.html',
  standalone: true,
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {
  private favoriteService = inject(FavoritesService);

  favorites$ = this.favoriteService.favorites$;

  favoriteCountries$: Observable<Country[]> = of([]);

  loading: boolean = true;

  constructor(
      private countryService: CountriesService,
      private favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    this.favoriteCountries$ = this.favorites$.pipe(
        tap(() => {
          this.loading = true
        }),
        switchMap(codes =>
            this.countryService.getCountriesByCode(codes).pipe(
                catchError(err => {
                  console.error(err);
                  return of([]);
                })
            )
        ),
        tap(() => this.loading = false)
    );
  }

  toggle(id: string) {
    this.favoritesService.toggleFavorite(id);
  }
}
