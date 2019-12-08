import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT: number = 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	console.log(`Listening on http://localhost:${PORT}/`);
	await app.listen(PORT);
}
bootstrap();
