import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, debounceTime, map, Observable, Subject } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  private searchText$ = new Observable<string>();
  private BOUNCE_TIEM = 500;

  public readonly pokemon$ = this.pokemonService.pokemon;
  public readonly errorMessage$ = this.pokemon$
    .pipe(catchError(error => error));
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

  private initSubscriptions(): void {
    this.searchText$ = this.searchForm.valueChanges.pipe(
      debounceTime(this.BOUNCE_TIEM),
      map(result => result.text)
    );

    this.searchText$.subscribe();
  }
}
