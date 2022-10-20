import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Planet } from "../models/planet.model";
import { Film } from "../models/film.model";
import { FilmPlanet } from "../models/filmPlanet.model";

@Injectable()
export class PlanetsService {
  constructor(
    @InjectModel(Planet)
    private planetModel: typeof Planet,
    @InjectModel(Film)
    private filmModel: typeof Film,
    @InjectModel(FilmPlanet)
    private filmPlanetModel: typeof FilmPlanet
  ) {}

  async findAll(name: string): Promise<Planet[]> {
    let condition = {};
    if (name) {
      condition = { name: name };
    }
    return this.planetModel.findAll({ where: condition });
  }

  findOne(id: number): Promise<Planet> {
    return this.planetModel.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    const planet = await this.findOne(id);
    await planet.destroy();
  }

  async insertPlanets(planets): Promise<void> {
    for (let i = 0; i < planets.length; i++) {
      const [planet, _] = await this.planetModel.findOrCreate({
        where: {
          apiId: planets[i].apiId,
        },
        defaults: {
          name: planets[i].name,
          climate: planets[i].climate,
          terrain: planets[i].terrain,
        },
      });

      for (const filmId of planets[i].filmIds) {
        await this.insertFilmPlanet(filmId, planet.id);
      }
    }
  }

  async insertFilmPlanet(filmApiId: number, planetId: number): Promise<void> {
    const film = await this.filmModel.findOne({ where: { apiId: filmApiId } });
    if (film) {
      await this.filmPlanetModel.findOrCreate({
        where: { planetId: planetId, filmId: film.id },
        defaults: {},
      });
    }
  }

  async update(id, planet): Promise<void> {
    await this.planetModel.update(
      { name: planet.name, climate: planet.climate, terrain: planet.terrain },
      { where: { id: id } }
    );
  }
}
