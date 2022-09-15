import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import axios from "axios";
import { itemDetailDto } from "src/dto/detail-item.dto";
import { Item } from "src/models/item.model";

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item) private itemModel: typeof Item,
      ) {}
      async items(){
        const items = await this.itemModel.findAll()
        return items
      }
      async detail(data: itemDetailDto) {
        const itemDetail = await this.itemModel.findOne({
          where: {
            id: data.id,
          }
        })
        return itemDetail
      }
}