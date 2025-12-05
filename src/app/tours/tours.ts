import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Country} from "../models";
import {debounceTime, Observable, Subject} from "rxjs";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {selectItems, selectItemsError, selectItemsLoading} from "./state/items.selectors";
import {Store} from "@ngrx/store";
import {loadItems} from "./state/items.actions";
import {OfflineService} from "../services/offline.service";
import {FavoritesService} from "../services/favorites.service";


@Component({
  selector: 'app-tours',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tours.html',
  standalone: true,
  styleUrl: './tours.css'
})
export class Tours implements OnInit {
  private offlineService = inject(OfflineService);

  online$ = this.offlineService.online$
  search: string = '';
  countries$!: Observable<Country[] | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  private favoritesService = inject(FavoritesService)
  private searchSubject = new Subject<string>();
  favorites$ = this.favoritesService.favorites$;

  constructor(
      private store: Store,
      private route: ActivatedRoute,
      private router: Router,
  ) {}


  toggle(id: string) {
    this.favoritesService.toggleFavorite(id);
  }

  ngOnInit() {
    this.countries$ = this.store.select(selectItems);
    this.loading$ = this.store.select(selectItemsLoading);
    this.error$ = this.store.select(selectItemsError);

    this.searchSubject
        .pipe(debounceTime(200))
        .subscribe(term => {
          this.store.dispatch(loadItems({ query: term || '' }));
        });

    this.route.queryParams.subscribe(params => {
      const term = params['search'] || '';
      this.search = term;
      this.searchSubject.next(term);
    });
  }

  searchResult(term: string) {
    this.searchSubject.next(term);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: term || null },
      queryParamsHandling: 'merge'
    });
  }
}
