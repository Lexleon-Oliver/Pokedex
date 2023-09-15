import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { map, mergeMap } from 'rxjs';
import { Pokemon } from './models/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pokedex';
  pokemons: Pokemon[] = [];
  limit: number = 20;
  offset: number = 0;

  constructor(private http: HttpClient,
    private service:AppService) {}

  ngOnInit(): void {
    this.carregar(this.offset, this.limit);
  }

  private transformPokemonData(pokemonData: any): Pokemon {
    const types = pokemonData.types.map((typeData: any) => typeData.type.name);
    return new Pokemon(
      pokemonData.order,
      pokemonData.name,
      types[0],
      types,
      pokemonData.sprites.other.dream_world.front_default
    );
  }

  carregar(offset: number, limit:number) {
    this.service.listPokemons(this.offset, this.limit)
    .pipe(
      mergeMap((data) => data.results), // Transforma o array de resultados em um fluxo de resultados individuais
      mergeMap((pokemon: any) => this.http.get(pokemon.url)), // Faz uma solicitação para cada URL de Pokémon
      map(this.transformPokemonData)
    )
    .subscribe((pokemon) => {
      this.pokemons.push(pokemon); // Adiciona cada Pokémon ao array de pokemons
      this.pokemons.sort((a, b) => a.id - b.id); // Classifica a lista pelo ID
    });
  }

  carregarMais() {
    this.offset = this.offset +20;
    this.carregar(this.offset, this.limit);
  }
}
