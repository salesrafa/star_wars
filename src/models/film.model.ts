import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { FilmPlanet } from "./filmPlanet.model";

@Table
export class Film extends Model {
  @Column({ allowNull: false, unique: true })
  apiId: number;

  @Column
  name: string;

  @Column
  director: string;

  @Column({
    type: DataType.DATE,
  })
  releaseDate: Date;

  @HasMany(() => FilmPlanet)
  filmPlanets: FilmPlanet[];
}
