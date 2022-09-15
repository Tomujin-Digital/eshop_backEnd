import { Column, Model, Table } from 'sequelize-typescript'

@Table
export class Basket extends Model {
  @Column
  totalPrice: number;
  @Column
  vat: string;
  @Column
  discount: number;
  @Column
  cash: number;
  @Column
  NonCash
}