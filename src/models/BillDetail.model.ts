import { Column, Model, Table } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

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
    basketId: number;
    @Column
    itemId: string
  }