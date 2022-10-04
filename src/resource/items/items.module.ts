import { Global, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppModule } from "src/app.module";
import { Item } from "./models/item.model";

@Global()
@Module({
    imports: [
      AppModule,
      SequelizeModule.forRoot({
        dialect: 'mysql',
        host: '13.215.139.119',
        port: 3306,
        username: 'rtd',
        password: 'Tiny722$',
        database: 'kherlen',
        models: [Item ],
      }),
      SequelizeModule.forFeature([Item]),
    ],
  
    controllers: [ItemController],
    providers: [ItemService],
  })
  export class userModule {}