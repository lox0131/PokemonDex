import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/pokemon';
import { PokemonList } from 'src/app/pokemon-list';
import { PokeApiService } from '../../services/PokeApiService/poke-api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public pokemons: Pokemon[] = [];

  routerSubscription: Subscription = new Subscription();

  storeSubscription: Subscription = new Subscription();

  constructor(private service: PokeApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.storeSubscription = this.service.current$.subscribe(
      (data: Pokemon[]) => {
        this.pokemons = data;
      }
    );

    this.routerSubscription = this.route.params.subscribe((params) => {
      const nameSearch: string = params['pokeName'];
      this.service.filterPokemons(nameSearch);
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
