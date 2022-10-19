import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { UUIDV4 } from 'sequelize';
import { Item } from './item.model';

@Table
export class ItemImages extends Model {
  @Column({ primaryKey: true, defaultValue:UUIDV4 })
  id:string
  @BelongsTo(()=> Item)
  Item: Item;
  @ForeignKey(()=> Item)
  itemId: string;
  @Column
  imageUrl:string;
}