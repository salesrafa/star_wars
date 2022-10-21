import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Planet } from "../models/planet.model";
import { Film } from "../models/film.model";
import { FilmPlanet } from "../models/filmPlanet.model";
import { PublicApiService } from "./publicApi.service";
import { FilmsService } from "./films.service";

@Injectable()
export class PlanetsService {
  constructor(
    @InjectModel(Planet)
    private planetModel: typeof Planet,
    @InjectModel(Film)
    private filmModel: typeof Film,
    @InjectModel(FilmPlanet)
    private filmPlanetModel: typeof FilmPlanet,
    private filmService: FilmsService
  ) {}

  async findAll(name: string): Promise<any> {
    let condition = {};
    if (name) {
      condition = { name: name };
    }
    const filmPlanets = await this.planetModel.findAll({
      where: condition,
      include: [{ model: FilmPlanet, include: [{ model: Film }] }],
    });

    return filmPlanets.map((planet) => {
      const films = planet.filmPlanets.map((filmPlanet) => {
        return {
          name: filmPlanet.film.name,
          director: filmPlanet.film.director,
          release_date: filmPlanet.film.releaseDate,
        };
      });
      return {
        apiId: planet.apiId,
        name: planet.name,
        climate: planet.climate,
        terrain: planet.terrain,
        films: films,
      };
    });
  }

  async findOne(apiId: number): Promise<any> {
    const planet = await this.planetModel.findOne({
      where: { apiId },
      include: [{ model: FilmPlanet, include: [{ model: Film }] }],
    });
    let films = [];
    if (planet) {
      films = planet.filmPlanets.map((filmPlanet) => {
        return {
          name: filmPlanet.film.name,
          director: filmPlanet.film.director,
          release_date: filmPlanet.film.releaseDate,
        };
      });
      return {
        id : planet.id,
        apiId: planet.apiId,
        name: planet.name,
        climate: planet.climate,
        terrain: planet.terrain,
        films: films,
      };
    }
    return null;
  }

  async remove(apiId: number): Promise<boolean> {
    const planet = await this.findOne(apiId);
    if (planet) {
      console.log(planet)
      await this.removeFilmPlanets(planet.id);
      await this.planetModel.destroy({ where: { id: planet.id } });
      return true;
    }
    return false;
  }

  async removeFilmPlanets(planetId): Promise<void> {
    await this.filmPlanetModel.destroy({ where: { planetId: planetId } });
  }

  async insertPlanet(apiId: number): Promise<any> {
    const planet = await PublicApiService.loadPlanet(apiId);
    if (planet) {
      const [planetCreated, wasCreated] = await this.planetModel.findOrCreate({
        where: {
          apiId: planet.apiId,
        },
        defaults: {
          name: planet.name,
          climate: planet.climate,
          terrain: planet.terrain,
        },
      });
      if (!wasCreated) {
        await planetCreated.update(
          {
            name: planet.name,
            climate: planet.climate,
            terrain: planet.terrain,
          },
          { where: { id: planetCreated.id } }
        );
      }
      for (const filmId of planet.filmIds) {
        await this.insertFilmPlanet(filmId, planetCreated.id);
      }
      return true;
    } else {
      return false;
    }
  }

  async insertFilmPlanet(filmApiId: number, planetId: number): Promise<any> {
    let film = await this.filmModel.findOne({ where: { apiId: filmApiId } });
    if (!film) {
      const apiFilm = await PublicApiService.loadFilm(filmApiId);
      if (apiFilm) {
        film = await this.filmService.insertFilm(apiFilm);
      } else {
        return false;
      }
    }

    if (film) {
      await this.filmPlanetModel.findOrCreate({
        where: { planetId: planetId, filmId: film.id },
        defaults: {},
      });
    }
  }

  async update(id, planet): Promise<boolean> {
    const [affectedCount] = await this.planetModel.update(
      { name: planet.name, climate: planet.climate, terrain: planet.terrain },
      { where: { id: id } }
    );
    return affectedCount > 0;
  }
}
