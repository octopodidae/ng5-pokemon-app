import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class PokemonsService {

	private pokemonsUrl = 'api/pokemons';

	constructor(private http: HttpClient) { }

	/** GET pokemons */
	getPokemons(): Observable<Pokemon[]> {
		return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
			tap(_ => this.log(`fetched pokemons`)),
			catchError(this.handleError('getPokemons', []))
		);
	}

	/** GET pokemon */
	getPokemon(id: number): Observable<Pokemon> {
		const url = `${this.pokemonsUrl}/${id}`;

		return this.http.get<Pokemon>(url).pipe(
			tap(_ => this.log(`fetched pokemon id=${id}`)),
			catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
		);
	}

	/** GET types */
	getPokemonTypes(): Array<string> {
		return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal',
			'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy'];
	}

	/* handleError */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}

	/* log */
	private log(log: string) {
		console.info(log);
	}
}