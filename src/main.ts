import { PublicApiService } from "./services/publicApi.service";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FilmsService } from "./services/films.service";
import { Film } from "./models/film.model";
import { PlanetsService } from "./services/planets.service";
import { Planet } from "./models/planet.model";
import { FilmPlanet } from "./models/filmPlanet.model";

async function bootstrap() {
  try {
    const planetsApp = await NestFactory.create(AppModule);
    //
    // const films = await PublicApiService.loadFilms();
    // const filmService = new FilmsService(Film);
    // await filmService.insertFilms(films);
    //
    // const planets = await PublicApiService.loadPlanets();
    // const planetService = new PlanetsService(Planet, Film, FilmPlanet);
    // await planetService.insertPlanets(planets);

    await planetsApp.listen(3000);
  } catch (e) {
    throw new Error(e);
  }
}

bootstrap();
