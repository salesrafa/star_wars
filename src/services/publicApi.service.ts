import { HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class PublicApiService {
  static async loadPlanet(apiId: number): Promise<any> {
    try {
      let swPublicApi = `${process.env.SW_PUBLIC_API}planets`;
      const client = axios.create({ baseURL: swPublicApi });
      const response = await client.get(`/${apiId}`);
      const filmIds = response.data.films.map((filmUrl) => {
        return filmUrl.split("/")[5];
      });
      const planetApiId = response.data.url.split("/")[5];
      return {
        apiId: planetApiId,
        name: response.data.name,
        climate: response.data.climate,
        terrain: response.data.terrain,
        filmIds: filmIds,
      };
    } catch (e) {
      return false;
    }
  }

  static async loadFilm(apiId): Promise<any> {
    let swPublicApi = `${process.env.SW_PUBLIC_API}films`;
    const client = axios.create({ baseURL: swPublicApi });
    const response = await client.get(`/${apiId}`);
    if (response.status === HttpStatus.OK) {
      const filmApiId = response.data.url.split("/")[5];
      return {
        apiId: filmApiId,
        name: response.data.title,
        director: response.data.director,
        releaseDate: response.data.release_date,
      };
    } else {
      return false;
    }
  }
}
