import { HttpException, HttpStatus, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./resource/users/models/user.model";
import { UserModule } from "./resource/users/user.module";
import { extname } from "path";
import { diskStorage } from "multer";
import { Item } from "./resource/items/models/item.model";
import { Basket } from "./resource/items/models/basket.model";
import { BasketItem } from "./resource/items/models/basket_item.model";
import { ItemImages } from "./resource/items/models/item_image.model";
import { BillDetail } from "./resource/items/models/bill_detail.model";
import { Category } from "./resource/items/models/category.model";
import { Brands } from "./resource/items/models/brand.model";
import { ItemModule } from "./resource/items/items.module";


export const multerOptions = {
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST
        ),
        false
      );
    }
  },

  storage: diskStorage({
    destination: "files/",

    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuidv4()}${extname(file.originalname)}`);
    },
  }),
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "54.169.69.87",
      port: 3306,
      username: "rtd",
      password: "Tiny722$",
      database: "grinding_geeks",
      models: [
        User,Item, Basket, BasketItem, BillDetail, ItemImages, Brands, Category
      ],
    }),
    UserModule, ItemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
function uuidv4() {
  throw new Error("Function not implemented.");
}

