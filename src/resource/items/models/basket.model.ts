import { UUIDV4 } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table, HasMany } from 'sequelize-typescript'
import { User } from 'src/resource/users/models/user.model';
import { BasketItem } from './basket_item.model';

@Table
export class Basket extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4 })
  id: string;
  @BelongsTo(() => User)
  User: User;
  @ForeignKey(()=> User)
  userId: string;
  @Column({defaultValue: 0})
  totalPrice: number;
  @Column
  vat: string;
  @Column
  discount: number;
  @Column({defaultValue: 'no'})
  cash: string;
  @Column({defaultValue: 'no'})
  nonCash: string;
  @HasMany(()=>BasketItem)
  BasketItem:BasketItem
}