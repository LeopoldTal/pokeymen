import { Controller, Get } from '@nestjs/common';
import { PokeApiService } from './poke-api/poke-api.service';

@Controller()
export class AppController {
	constructor(
		private readonly pokeApiService: PokeApiService,
	) { }

	@Get()
	async getAll(): Promise<string[]> {
		return this.pokeApiService.getAll();
	}

	@Get('/favourite-pokemon')
	getFavouritePokemon(): string {
		return this.pokeApiService.getBestPokemonName();
	}
}
