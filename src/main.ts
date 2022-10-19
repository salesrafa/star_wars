import { PublicApiService } from "./services/publicApi.service";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FilmsService } from "./services/films.service";
import { Film } from "./models/film.model";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const films = await PublicApiService.loadFilms();
    const filmService = new FilmsService(Film);
    await filmService.insertFilms(films);

    if (films) {
    await app.listen(3000);
    }
  } catch (e) {
    throw new Error(e);
  }
}
bootstrap();
