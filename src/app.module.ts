import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Planet } from "./models/planet.model";
import { Film } from "./models/film.model";
import { FilmPlanet } from "./models/filmPlanet.model";
import { FilmsService } from "./services/films.service";
import { PlanetsController } from "./controllers/planets.controller";
import { PlanetsService } from "./services/planets.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Film, Planet, FilmPlanet]),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService, FilmsService],
})
export class AppModule {}
