import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Country} from "../models";
import {debounceTime, Observable, Subject} from "rxjs";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {selectItems, selectItemsError, selectItemsLoading} from "./state/items.selectors";
import {Store} from "@ngrx/store";
import {loadItems} from "./state/items.actions";
import {FavoritesService} from "../services/favorites.service";


@Component({
  selector: 'app-tours',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tours.html',
  standalone: true,
  styleUrl: './tours.css'
})
export class Tours implements OnInit {
  search: string = '';

  countries$!: Observable<Country[] | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  pagedCountries: Country[] = [];

  page = 1;
  pageSize = 12;

  private favoritesService = inject(FavoritesService)
  private searchSubject = new Subject<string>();
  favorites$ = this.favoritesService.favorites$;

  constructor(
      private store: Store,
      private route: ActivatedRoute,
      private router: Router,
  ) {}


  // ⭐ Toggle favorites
  toggle(id: string) {
    this.favoritesService.toggleFavorite(id);
  }

  ngOnInit() {
    this.countries$ = this.store.select(selectItems);
    this.loading$ = this.store.select(selectItemsLoading);
    this.error$ = this.store.select(selectItemsError);

    // 🔍 Debounced search
    this.searchSubject
        .pipe(debounceTime(200))
        .subscribe(term => {
          this.store.dispatch(loadItems({ query: term || '' }));
        });

    // 🔄 Read query params: search, page, pageSize
    this.route.queryParams.subscribe(params => {
      this.search = params['search'] || '';
      this.page = +(params['page'] || 1);
      this.pageSize = +(params['pageSize'] || 12);

      this.searchSubject.next(this.search);
    });

    // Подписка на страны → перерасчёт пагинации
    this.countries$.subscribe(list => {
      if (!list) return;
      this.updatePagedCountries(list);
    });
  }


  // 🔢 Pagination logic
  updatePagedCountries(list: Country[]) {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedCountries = list.slice(start, end);
  }


  // 🔍 Search handler
  searchResult(term: string) {
    this.searchSubject.next(term);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: term || null,
        page: 1,           // при поиске всегда на первую страницу
        pageSize: this.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }


  // ⏭ Change page
  changePage(newPage: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: newPage,
        pageSize: this.pageSize
      },
      queryParamsHandling: 'merge'
    });
  }


  // 📦 Change page size
  changePageSize(event: Event) {
    const size = Number((event.target as HTMLSelectElement).value);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        pageSize: size
      },
      queryParamsHandling: 'merge'
    });
  }
}