import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Basket } from './basket.model';

@Table
export class BillDetail extends Model {
  @Column({ primaryKey : true, defaultValue : UUIDV4() })
  id: string;
  @Column
  name: string;
  @Column
  price: number;
  @Column
  discount: number;
  @Column
  qty: number;
  @Column
  Basket: string;
  @BelongsTo(() => Basket)
  basket: Basket;
  @ForeignKey(()=> Basket)
  basketId: Basket
}