import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { Order } from './Order.model';

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
    @BelongsTo(() => Order)
    basketId: Order;
    @ForeignKey(()=> Order)
    Basket: string;
    @Column
    itemId: string
  }