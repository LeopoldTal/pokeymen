import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
class PokeApiService {
	constructor(
		private readonly httpService: HttpService
	) { }

	public getBestPokemonName = () => 'Scyther';

	public getAll = async (): Promise<string[]> => {
		const res = await this.httpService
			.get('https://pokeapi.co/api/v2/pokemon')
			.toPromise();
		return res.data.results.map(({ name }) => name);
	};
}

export { PokeApiService };
