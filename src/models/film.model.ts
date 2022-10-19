import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Film extends Model {
  @Column({ allowNull: false })
  apiId: number;

  @Column
  name: string;

  @Column
  director: string;

  @Column({
    type: DataType.DATE,
  })
  releaseDate: Date;
}
