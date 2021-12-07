import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Pokemon, PokemonPageResult } from './models/pokemon.model';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly pokemonPath = 'pokemon';
  private readonly pokemon$: BehaviorSubject<Array<Pokemon>>;

  constructor(private httpClient: HttpClient) {
    this.pokemon$ = new BehaviorSubject<Array<Pokemon>>([]);
    this.initPokemon();
  }

  public get pokemon(): Observable<Array<Pokemon>> {
    return this.pokemon$.asObservable();
  }

  private get url(): string {
    return environment.pokemonApi + this.pokemonPath;
  }

  private getPokemon(): Observable<Array<Pokemon>> {
    return this.httpClient.get<PokemonPageResult>(
      this.url
    ).pipe(
      catchError( (error) => {
        console.error('Unable to get Pokemon:', error);
        return throwError(() => 'Unable to get Pokemon. Try again later');
      }),
      map((result) => result.results)
    );
  }

  private initPokemon(): void {
    const query = this.getPokemon();
    query.subscribe(this.pokemon$);
  }
}
