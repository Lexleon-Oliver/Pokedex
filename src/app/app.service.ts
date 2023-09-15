import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly API = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private httpClient: HttpClient) { }

  listPokemons(offset:number, limit:number) {
    return this.httpClient.get<any>(`${this.API}?offset=${offset}&limit=${limit}`)
    .pipe(
      first()
    )
  }

}
