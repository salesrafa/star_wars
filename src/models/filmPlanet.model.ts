import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Film } from "./film.model";
import { Planet } from "./planet.model";

@Table
export class FilmPlanet extends Model {
  @ForeignKey(() => Planet)
  @Column({ allowNull: false })
  planetId: number;

  @ForeignKey(() => Film)
  @Column({ allowNull: false })
  filmId: number;

  @BelongsTo(() => Planet)
  planet: Planet;

  @BelongsTo(() => Film)
  film: Film;
}
