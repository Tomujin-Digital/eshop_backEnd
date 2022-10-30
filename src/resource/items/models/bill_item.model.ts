import { UUIDV4 } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/resource/users/models/user.model';
import { Basket } from './basket.model';
import { BillDetail } from './bill_detail.model';
import { Item } from './item.model';

@Table
export class BillItem extends Model {
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
    @ForeignKey(()=> BillDetail)
    billId: string;
    @BelongsTo(()=> BillDetail)
    BillDetail: BillDetail;
    @ForeignKey(()=> User)
    userId: string;
    @BelongsTo(()=> User)
    User: User
    @Column
    count: string
    @Column
    Delivered: Boolean

}