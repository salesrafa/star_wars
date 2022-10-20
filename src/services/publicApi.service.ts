import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class PublicApiService {
  static async loadPlanets(): Promise<any> {
    let swPublicApi = `${process.env.SW_PUBLIC_API}planets`;
    console.log(`loading data in DB from ${swPublicApi}`);
    const client = axios.create({ baseURL: swPublicApi });
    let page = 1;
    let planets = [];
    while (page && page < 1000) {
      const { data } = await client.get(`?page=${page}`);
      if (data) {
        data.results.forEach((planet) => {
          const filmIds = planet.films.map((filmUrl) => {
            return filmUrl.split("/")[5];
          });
          const planetApiId = planet.url.split("/")[5];
          planets.push({
            apiId: planetApiId,
            name: planet.name,
            climate: planet.climate,
            terrain: planet.terrain,
            filmIds: filmIds,
          });
        });
        page = data.next ? page + 1 : null;
      }
    }
    return planets;
  }

  static async loadFilms(): Promise<any[]> {
    let swPublicApi = `${process.env.SW_PUBLIC_API}films`;
    console.log(`loading films in DB from ${swPublicApi}`);
    const client = axios.create({ baseURL: swPublicApi });
    let page = 1;
    let films = [];
    while (page && page < 1000) {
      const { data } = await client.get(`?page=${page}`);
      if (data) {
        data.results.forEach((film) => {
          const filmApiId = film.url.split("/")[5];
          films.push({
            apiId: filmApiId,
            name: film.title,
            director: film.director,
            release_date: film.release_date,
          });
        });
        page = data.next ? page + 1 : null;
      }
    }
    return films;
  }
}
