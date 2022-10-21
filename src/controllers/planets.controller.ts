import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { PlanetsService } from "../services/planets.service";

@Controller("planet")
export class PlanetsController {
  constructor(private readonly planetService: PlanetsService) {}

  @Post("load-planet/:apiId")
  async put(
    @Param("apiId") apiId: number,
    @Body() planet: any,
    @Res() res: Response
  ): Promise<void> {
    const wasCreated = await this.planetService.insertPlanet(apiId);
    if (wasCreated) {
      res.json({ message: "success" });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "NOT FOUND" });
    }
  }

  @Get()
  async getAll(
    @Query("name") name: string,
    @Res() res: Response
  ): Promise<void> {
    const planets = await this.planetService.findAll(name);
    if (planets.length > 0) {
      res.json(planets);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "NO PLANETS" });
    }
  }

  @Get(":id")
  async get(@Param("id") id: number, @Res() res: Response): Promise<any> {
    const planet = await this.planetService.findOne(id);
    if (planet) {
      res.json(planet);
    } else {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "THERE IS NO PLANET WITH THIS ID" });
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: number, @Res() res: Response): Promise<any> {
    const wasDeleted = await this.planetService.remove(id);
    if (wasDeleted) {
      res.json({ message: "success" });
    } else {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "THERE IS NO PLANET WITH THIS ID" });
    }
  }
}
