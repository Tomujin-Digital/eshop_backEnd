import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/models/user.model";
import { ItemController } from "./items.controller";
import { ItemService } from "./items.service";
import { Basket } from "./models/basket.model";
import { BasketItem } from "./models/basket_item.model";
import { BillDetail } from "./models/bill_detail.model";
import { Brands } from "./models/brand.model";
import { Category } from "./models/category.model";
import { Item } from "./models/item.model";
import { ItemImages } from "./models/item_image.model";

@Module({
  imports: [
     SequelizeModule.forFeature([User, Item, Basket, BasketItem, BillDetail, ItemImages, Brands, Category]),
  ],
  controllers: [ItemController],
  providers: [ItemService],

})
export class ItemModule {}