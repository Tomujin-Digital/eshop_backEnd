import { Column, Table, Model } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table
export class Product extends Model {
    @Column({ primaryKey: true, defaultValue: UUIDV4() })
id: string;

  @Column
  name: string;

  @Column
  price: string;

  @Column
  info: string;

}


