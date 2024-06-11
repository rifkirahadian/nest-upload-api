import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Content extends Model {
  @Column
  filename: string;

  @Column
  mime: string;

  @Column
  size: number;
}
