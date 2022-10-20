import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { FilmPlanet } from "./filmPlanet.model";

@Table
export class Planet extends Model {
  @Column({ allowNull: false, unique: true })
  apiId: number;

  @Column
  name: string;

  @Column
  climate: string;

  @Column
  terrain: string;

  @HasMany(() => FilmPlanet)
  filmPlanets: FilmPlanet[];
}
