import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Planet } from "../models/planet.model";
import { PlanetsController } from "../controllers/planets.controller";
import { PlanetsService } from "../services/planets.service";

@Module({
  imports: [SequelizeModule.forFeature([Planet])],
  providers: [PlanetsService],
  controllers: [PlanetsController],
})
export class PlanetsModule {}
