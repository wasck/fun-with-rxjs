export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonPageResult {
  count: number,
  next: string,
  previous: string,
  results: Array<Pokemon>
}