import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, DecimalPipe, NgIf} from "@angular/common";
import { Location } from '@angular/common';
import {loadItem} from "../../tours/state/items.actions";
import {selectItemError, selectItemLoading, selectSelectedItem} from "../../tours/state/items.selectors";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Country} from "../../models";


@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [NgIf, DecimalPipe, AsyncPipe],
  templateUrl: './tour-details.html',
  styleUrls: ['./tour-details.css']
})
export class TourDetails implements OnInit {

  country$!: Observable<Country | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  constructor(
      private store: Store,
      private route: ActivatedRoute,
      private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('code')!;
    this.store.dispatch(loadItem({ id: id }));

    this.country$ = this.store.select(selectSelectedItem);
    this.loading$ = this.store.select(selectItemLoading);
    this.error$ = this.store.select(selectItemError);
  }

  back() {
    this.location.back();
  }
}