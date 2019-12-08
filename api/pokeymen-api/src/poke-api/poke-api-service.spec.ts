import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, HttpModule } from '@nestjs/common';
import { of } from 'rxjs';
import { PokeApiService } from './poke-api.service';

describe('PokeApiService', () => {
	let service: PokeApiService;
	let httpService: HttpService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [HttpModule],
			providers: [PokeApiService],
		}).compile();

		service = app.get<PokeApiService>(PokeApiService);
		httpService = app.get<HttpService>(HttpService);
	});

	describe('getBestPokemonName', () => {
		it('gets Adam\'s favourite Pokemon, which is NOT the best', () => {
			expect(service.getBestPokemonName()).toBe('Scyther');
		});
	});

	describe('getAll', () => {
		it('gets a list of Pokemon names', async () => {
			const pokemonList = [
				{ name: 'Bulbasaur' },
				{ name: 'Squirtle' },
				{ name: 'Charmander' }
			];
			const pokeApiRes = {
				status: 200,
				statusText: 'OK',
				config: {},
				headers: {},
				data: {
					results: pokemonList
				}
			};

			jest.spyOn(httpService, 'get')
				.mockImplementation(() => of(pokeApiRes));

			const expectedNames = ['Bulbasaur', 'Squirtle', 'Charmander'];
			expect(await service.getAll()).toEqual(expectedNames);
		});
	});
});
