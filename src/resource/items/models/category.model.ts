import { Column, Model, Table } from 'sequelize-typescript'
import { UUIDV4 } from 'sequelize';

@Table
export class Category extends Model {
  @Column({ primaryKey : true, defaultValue : UUIDV4() })
  id: string;
  @Column
  name:string;
  @Column
  type:string;
}