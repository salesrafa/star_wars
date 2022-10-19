import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class PublicApiService {
  static async loadData(): Promise<boolean> {
    let swPublicApi = `${process.env.SW_PUBLIC_API}planets`;
    console.log(`loading data in DB from ${swPublicApi}`);
    const client = axios.create({ baseURL: swPublicApi });
    let page = 1;
    let planets = [];
    while (page && page < 1000) {
      const { data } = await client.get(`?page=${page}`);
      if (data) {
        console.log(data.results);
        page = data.next ? page + 1 : null;
      }
    }
    return true;
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
