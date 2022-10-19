import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class PublicApiService {
  static async loadData(): Promise<boolean> {
    let swPublicApi = `${process.env.SW_PUBLIC_API}planets`;
    console.log(`loading data in DB from ${swPublicApi}`);
    const client = axios.create({ baseURL: swPublicApi });
    let page = 1;
    while (page && page < 1000) {
      const { data } = await client.get(`?page=${page}`);
      if (data) {
        console.log(data.results.length);
        page = data.next ? page + 1 : null;
      }
    }
    return true;
  }
}
