import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Film } from "../models/film.model";

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film)
    private filmModel: typeof Film
  ) {}

  async insertFilm(film): Promise<any> {
    return this.filmModel.create(film);
  }
}
