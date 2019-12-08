import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PokeApiService } from './poke-api/poke-api.service';

@Module({
	imports: [HttpModule],
	controllers: [AppController],
	providers: [PokeApiService],
})
export class AppModule { }
