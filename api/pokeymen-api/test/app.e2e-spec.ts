import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { of } from 'rxjs';

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let httpService: HttpService;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		httpService = app.get<HttpService>(HttpService);

		await app.init();
	});

	it('/ (GET)', () => {
		const pokeApiRes = {
			status: 200,
			statusText: 'OK',
			config: {},
			headers: {},
			data: {
				results: [
					{ name: 'rattata' },
					{ name: 'blastoise' }
				]
			}
		};
		jest.spyOn(httpService, 'get')
			.mockImplementation(() => of(pokeApiRes));

		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect([
				'rattata',
				'blastoise'
			]);
	});
});
