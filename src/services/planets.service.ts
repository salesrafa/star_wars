import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Planet } from "../models/planet.model";

@Injectable()
export class PlanetsService {
  constructor(
    @InjectModel(Planet)
    private userModel: typeof Planet
  ) {}

  async findAll(): Promise<Planet[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<Planet> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
