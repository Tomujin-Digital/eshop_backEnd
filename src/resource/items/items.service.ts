
import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import axios from "axios";
import { AddBasketItem, RemoveBasketITem, ReturnItemInBasket } from "./dto/basket.dto";
import { AddNewItem, ItemDetail, SearchByCat } from "./dto/Item.dto";
import { Item } from "./models/item.model";
import { Basket } from "./models/basket.model";
import { BasketItem } from "./models/basket_item.model";
import { User } from "../users/models/user.model";


export type itemCheck={
  itemName: string;
}

export type itemInBasket={
  itemId: string;
  basketId: string;
}
@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item) private itemModel: typeof Item,
        @InjectModel(Basket) private basketModel: typeof Basket,
        @InjectModel(BasketItem) private basketItemModel: typeof BasketItem,
        @InjectModel(User) private userModel: typeof User,
      ) {}

      async itemCheck({ itemName }: itemCheck): Promise<any>{
        if(!!itemName){
          const itemCheck= await this.itemModel.findOne({where:{
            itemName: itemName
          }});
          if(!itemCheck) 
          return true;
          throw new HttpException('ITEM_NAME_ALREADY_EXISTS', 400);
        }
      }

      async itemInbBasket({ itemId, basketId}: itemInBasket): Promise<any>{
        if(!!itemId || !!basketId) {
          const itemCheck = await this.basketItemModel.findOne({
            where: {
              itemId: itemId,
              basketId: basketId,
            }
          })
          if (itemCheck){
            this.basketItemModel
              .update({ count:itemCheck.count +1 }, {where: { itemId: itemId, basketId: basketId}})
              itemCheck.save()
          }
        }
      }
      async items(){
        const items = await this.itemModel.findAll()
        return items
      }
      async detail(data: ItemDetail) {
        const itemDetail = await this.itemModel.findOne({
          where: {
            id: data.id,
          }
        })
        return itemDetail
      }

      async addNewItem(data: AddNewItem){
        let checkedItem = await this.itemCheck({ itemName: data.itemName }) 
        if ( checkedItem = true) {
          const newItem = new this.itemModel({
            itemName: data.itemName,
            price: data.price,
            brandId: data.brandName,
            categotyId: data.categoryId,
            quantity: data.quantity
          }) 
          newItem.save();
          return newItem
        }
        
      }

      async searchbyCat(data: SearchByCat){
        const items = await this.itemModel.findAll({
            where: {
                category: data.Category
            }
        })
        return items
      }

      async AddItemToBasket(data: AddBasketItem) {
        const Item = new this.basketItemModel({
          basketId: data.basketId,
          itemId: data.itemId,
          count: data.count
        })
        Item.save()
        return Item
      }

      async ReturnItemsInBasket(data: ReturnItemInBasket){
        const basketId = await this.basketModel.findOne({
          where: {
            userId: data.userId
          }
        })
        const Items = await this.basketItemModel.findAll({
          where: {
            basketId: basketId
          }
        })
        return Items 
      }
}