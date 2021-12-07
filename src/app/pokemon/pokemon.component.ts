import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, tap } from 'rxjs';
import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  private searchText$ = new Observable<string>();
  private BOUNCE_TIEM = 800;

  public pokemon$?: Observable<Array<Pokemon>>;
  public searchForm: FormGroup;
  public readonly onKeyUp$ = new Subject<void>();

  constructor(
    private pokemonService: PokemonService,
    private formbuilder: FormBuilder
  ) {
    this.searchForm = this.formbuilder.group({
      text: ['']
    });

    this.initSubscriptions();
  }

  public onKeyUp(): void {
    this.onKeyUp$.next();
  }

  public cleanFilter(): void {
    this.searchForm.reset()
  }

  private initSubscriptions(): void {
    this.pokemon$ = this.pokemonService.pokemon;
    
    this.searchText$ = this.searchForm.valueChanges.pipe(
      debounceTime(this.BOUNCE_TIEM),
      distinctUntilChanged(), // only if different than last
      map(result => result.text),
      tap(console.log)
    );

    this.searchText$.subscribe();
  }
}
