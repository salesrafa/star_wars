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
  async load(
    @Param("apiId") apiId: number,
    @Res() res: Response
  ): Promise<boolean> {
    const wasCreated = await this.planetService.insertPlanet(apiId);
    if (wasCreated) {
      res.json({ message: "success" });
      console.log(`${new Date()} - planet created - api id ${apiId}`)
      return true;
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "NOT FOUND" });
      console.log(`${new Date()} - planet not created - api id ${apiId}`)
      return false;
    }
  }

  @Get()
  async getAll(
    @Query("name") name: string,
    @Res() res: Response
  ): Promise<void> {
    const planets = await this.planetService.findAll(name);
    if (planets.length > 0) {
      console.log(`${new Date()} - planets founded ${planets.length}`)
      res.json(planets);
    } else {
      console.log(`${new Date()} - no planets was founded`)
      res.status(HttpStatus.NOT_FOUND).json({ message: "NO PLANETS" });
    }
  }

  @Get(":id")
  async get(@Param("id") id: number, @Res() res: Response): Promise<any> {
    const planet = await this.planetService.findOne(id);
    if (planet) {
      console.log(`${new Date()} - planet founded ${planet.name}`)
      res.json(planet);
    } else {
      console.log(`${new Date()} - no planets was founded`)
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "THERE IS NO PLANET WITH THIS ID" });
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: number, @Res() res: Response): Promise<any> {
    const wasDeleted = await this.planetService.remove(id);
    if (wasDeleted) {
      console.log(`${new Date()} - planet deleted - id ${id}`)

      res.json({ message: "success" });
    } else {
      console.log(`${new Date()} - planet not deleted - id ${id}`)
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "THERE IS NO PLANET WITH THIS ID" });
    }
  }
}
