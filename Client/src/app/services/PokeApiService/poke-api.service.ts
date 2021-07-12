import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PokemonList } from 'src/app/pokemon-list';
import { Pokemon } from 'src/app/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private pokeApiURL: string = 'https://pokeapi.co/api/v2/';
  public __pokemons: Pokemon[] = [];
  public current$ = new BehaviorSubject<Pokemon[]>([]);

  constructor(private http: HttpClient) {}

  gottaCatchEmAll(): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.pokeApiURL}pokemon?limit=150`);
  }

  gottaCatchEmAll2(): Pokemon[] {
    let pok: Pokemon[] = [];
    this.gottaCatchEmAll().subscribe((pokemonList) => {
      pokemonList.results.forEach((pokemon) => {
        this.catchOneByName(pokemon.name).subscribe((pokemons) => {
          pok.push(pokemons);
          pok = pok.sort((a, b) => a.id - b.id);
          this.current$.next(pok);
        });
      });
    });
    
    return pok;
  }

  catchOne(pokemonId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.pokeApiURL}pokemon/${pokemonId}`);
  }

  catchOneByName(pokemonName: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.pokeApiURL}pokemon/${pokemonName}`);
  }

  filterPokemons(query: string) {
    const re = new RegExp(query, 'i');
    return this.current$.next(
      this.__pokemons.filter((pok) => re.test(pok.name))
    );
  }

  fetchPokemons() {
    let arrayPoke = this.gottaCatchEmAll2();
    this.__pokemons = arrayPoke;
  }
}
