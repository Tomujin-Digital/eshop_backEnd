import { StringifyOptions } from 'querystring';
import { Column, Model, Table } from 'sequelize-typescript'
import { UUIDV4 } from 'sequelize';

@Table
export class Item extends Model {
  @Column({ primaryKey: true, defaultValue : UUIDV4() })
  id: string;
  @Column({ unique: true })
  itemName:string
  @Column({  defaultValue : 0 })
  price: number;
  @Column
  description: string;
  @Column
  brandId:string;
  @Column
  categoryId: string;
  @Column({  defaultValue : 0 })
  quantity: number;
}