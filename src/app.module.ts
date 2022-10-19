import { Module } from "@nestjs/common";
import { AppController } from "./controllers/app.controller";
import { AppService } from "./services/app.service";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Planet } from "./models/planet.model";
import { Film } from "./models/film.model";
import { FilmsService } from "./services/films.service";

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
      models: [Planet, Film],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService, FilmsService],
})
export class AppModule {}
