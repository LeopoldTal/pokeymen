import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
	let appController: AppController;

	const fakePokeApiService = {
		getBestPokemonName: () => 'Bulbasaur',
		getAll: () => ['Pikachu', 'Mew']
	};

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [{
				provide: 'PokeApiService',
				useValue: fakePokeApiService
			}],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('getAll', () => {
		it('gets a list of Pokemon', async () => {
			expect(await appController.getAll()).toEqual(['Pikachu', 'Mew']);
		});
	});

	describe('favourite Pokemon', () => {
		it('returns the objectively best Pokemon', () => {
			expect(appController.getFavouritePokemon()).toBe('Bulbasaur');
		});
	});
});
