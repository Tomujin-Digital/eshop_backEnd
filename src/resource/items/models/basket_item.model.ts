import { UUIDV4 } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/resource/users/models/user.model';
import { Basket } from './basket.model';
import { Item } from './item.model';

@Table
export class BasketItem extends Model {
    @Column({ primaryKey : true, defaultValue : UUIDV4() })
    id: string;
    @ForeignKey(()=> Basket)
    basketId: string;
    @BelongsTo(()=> Basket)
    Basket: Basket;
    @ForeignKey(()=> Item)
    itemId: string;
    @BelongsTo(()=> Item)
    Item: Item;
    @ForeignKey(()=> User)
    userId: string;
    @BelongsTo(()=> User)
    User: User
    @Column
    count: string
}