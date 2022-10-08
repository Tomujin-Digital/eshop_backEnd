
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import axios from "axios";
import { AddItem, ItemDetail, SearchByCat } from "./dto/Item.dto";
import { Item } from "./models/item.model";

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item) private itemModel: typeof Item,
      ) {}
      async items(){
        const items = await this.itemModel.findAll()
        return items
      }
      async detail(data: ItemDetail) {
        const itemDetail = await this.itemModel.findOne({
          where: {
            id: data.Id,
          }
        })
        return itemDetail
      }
      async addItem(data: AddItem){
        const newItem = new this.itemModel({
            name: data.name,
            price: data.price,
            brand: data.brand,
            categoty: data.category,
            quantity: data.quantity
        }) 
        newItem.save();
        return newItem
      }

      async searchbyCat(data: SearchByCat){
        const items = await this.itemModel.findAll({
            where: {
                category: data.Category
            }
        })
        return items
      }
}