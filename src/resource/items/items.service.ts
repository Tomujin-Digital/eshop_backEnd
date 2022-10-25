
import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ReturnItemInBasket } from "./dto/basket.dto";
import { AddNewItem, ItemDetail, SearchByCat } from "./dto/Item.dto";
import { Item } from "./models/item.model";
import { Basket } from "./models/basket.model";
import { BasketItem } from "./models/basket_item.model";
import { User } from "../users/models/user.model";

export type ItemCheck={
  itemName: string;
}

export type Checks={
  itemName: string;
  itemId: string;
  basketId: string;
  count: number;
  userId:string;
}

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item) private itemModel: typeof Item,
    @InjectModel(Basket) private basketModel: typeof Basket,
    @InjectModel(BasketItem) private basketItemModel: typeof BasketItem,
    @InjectModel(User) private userModel: typeof User,
    ) {}
    async BasketDetail ({ basketId }: Checks): Promise<any>{
      
    }

    async itemCheck({ itemName }: ItemCheck): Promise<any>{
      if(!!itemName){
        const itemCheck= await this.itemModel.findOne({where:{
          itemName: itemName
        }});
        if(!itemCheck) 
        return true;
        throw new HttpException('ITEM_ALREADY_EXISTS', 400);
      }
    }

    async basketCheck({ basketId }: Checks ): Promise<any>{
      if(!!basketId){
        const basketCheck= await this.basketModel.findOne(
          {
            where: {basketId: basketId}
          }
        )
        return basketCheck
      }else{
        const NewBasket = new this.basketModel({
          userId: basketId
        })
        NewBasket.save()
        return NewBasket
      }
    }

    async AddItemInBasket({ itemId, basketId, count }: Checks): Promise<any>{
      if(!!itemId || !!basketId) {
        const ItemInBasket = await this.basketItemModel.findOne({
          where: {
            itemId: itemId,
            basketId: basketId,
          }
        })
        const ItemDetail = await this.itemModel.findOne({
          where: {
            itemId: itemId
          }
        })
        const BasketDetail = await this.basketModel.findOne({
          where: {
            id: basketId
          }
        })
        if (ItemInBasket){
          this.basketItemModel
          .update({ count:ItemInBasket.count + count }, {where: { itemId: itemId, basketId: basketId}})
          ItemInBasket.save()
        }else{
          const Item = new this.basketItemModel({
            basketId: basketId,
            itemId: itemId,
            count: count
          })
          Item.save()
          return Item
        }
        this.basketModel
        .update({ totalPrice: BasketDetail.totalPrice + ItemDetail.price }, {where: { basketId: basketId}})
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

    async RemoveItemFromBasket({ itemId, basketId, count }: Checks): Promise<any>{
      const ItemInBasket = await this.basketItemModel.findOne({
        where: {
          itemId: itemId,
          basketId: basketId,
        }
      })
      const ItemDetail = await this.itemModel.findOne({
        where: {
          itemId: itemId
        }
      })
      const BasketDetail = await this.basketModel.findOne({
        where: {
          id: basketId
        }
      })
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