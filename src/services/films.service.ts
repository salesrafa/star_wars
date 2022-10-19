import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Film } from "../models/film.model";

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film)
    private filmModel: typeof Film
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.findAll();
  }

  findOne(id: string): Promise<Film> {
    return this.filmModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async insertFilms(films): Promise<void> {
    for (let i = 0; i < films.length; i++) {
      console.log(films[i]);
      await this.filmModel.findOrCreate({
        where: {
          apiId: films[i].apiId,
          name: films[i].name,
          director: films[i].director,
          releaseDate: films[i].release_date,
        },
      });
    }
  }
}
