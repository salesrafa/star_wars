import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from "@nestjs/common";
import { PlanetsService } from "../services/planets.service";

@Controller("planet")
export class PlanetsController {
  constructor(private readonly planetService: PlanetsService) {}

  @Put(":id")
  async put(@Param("id") id: number, @Body() planet: any): Promise<any> {
    console.log("here");
    await this.planetService.update(id, planet);
    return { message: "success" };
  }

  @Get()
  async getAll(@Query("name") name: string): Promise<any> {
    return this.planetService.findAll(name);
  }

  @Get(":id")
  async get(@Param("id") id: number): Promise<any> {
    return this.planetService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<any> {
    await this.planetService.remove(id);
    return { message: "success" };
  }
}
