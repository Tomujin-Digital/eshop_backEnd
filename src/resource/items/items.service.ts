import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {
  AddBasketItem,
  BasketCheck,
  Order,
  RemoveBasketITem,
  ReturnItemInBasket,
} from "./dto/basket.dto";
import { AddNewItem, ItemDetail, SearchByCat } from "./dto/Item.dto";
import { Item } from "./models/item.model";
import { Basket } from "./models/basket.model";
import { BasketItem } from "./models/basket_item.model";
import { User } from "../users/models/user.model";
import { BillDetail } from "./models/bill_detail.model";
import { BillItem } from "./models/bill_item.model";

export type ItemCheck = {
  itemName: string;
};

export type Checks = {
  itemName: string;
  itemId: string;
  basketId: string;
  count: number;
  userId: string;
};

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item) private itemModel: typeof Item,
    @InjectModel(Basket) private basketModel: typeof Basket,
    @InjectModel(BasketItem) private basketItemModel: typeof BasketItem,
    @InjectModel(BillDetail) private BillDetailModel: typeof BillDetail,
    @InjectModel(BillItem) private BillItemModel: typeof BillItem,
    @InjectModel(User) private userModel: typeof User
  ) {}

  async items() {
    const items = await this.itemModel.findAll();
    return items;
  }

  async itemCheck({ itemName }: ItemCheck): Promise<any> {
    if (!!itemName) {
      const itemCheck = await this.itemModel.findOne({
        where: {
          itemName: itemName,
        },
      });
      if (!itemCheck) return true;
      throw new HttpException("ITEM_ALREADY_EXISTS", 400);
    }
  }

  async searchbyCat(data: SearchByCat) {
    const items = await this.itemModel.findAll({
      where: {
        category: data.Category,
      },
    });
    return items;
  }

  async basketCheck(data: BasketCheck) {
    if (!!data.basketId) {
      const basketCheck = await this.basketModel.findOne({
        where: { basketId: data.basketId },
      });
      return basketCheck;
    } else {
      const NewBasket = new this.basketModel({
        userId: data.userId,
      });
      NewBasket.save();
      return NewBasket;
    }
  }

  async addNewItem(data: AddNewItem) {
    let checkedItem = await this.itemCheck({ itemName: data.itemName });
    if ((checkedItem = true)) {
      const newItem = new this.itemModel({
        itemName: data.itemName,
        price: data.price,
        brandId: data.brandName,
        categotyId: data.categoryId,
        quantity: data.quantity,
      });
      newItem.save();
      return newItem;
    }
  }

  async ReturnItemsInBasket(data: ReturnItemInBasket) {
    const Items = await this.basketItemModel.findAll({
      where: {
        basketId: data.basketId,
      },
    });
    return Items;
  }

  async AddItemInBasket(data: AddBasketItem) {
    const Item = await this.basketItemModel.findOne({
      where: {
        itemId: data.itemId,
        basketId: data.basketId,
      },
    });
    const BasketCheck = await this.basketModel.findOne({
      where: {
        id: data.basketId,
      },
    });
    const ItemCheck = await this.itemModel.findOne({
      where: {
        id: data.itemId,
      },
    });

    const ItemCheckInbasket = await this.basketItemModel.findOne({
      where: {
        itemId: data.itemId,
        basketId: data.basketId,
      },
    });
    if (!!data.itemId || !!data.basketId) {
      if (ItemCheckInbasket) {
        this.basketItemModel.update(
          { count: ItemCheckInbasket.count + data.count },
          { where: { itemId: data.itemId } }
        );
      } else {
        const Item = new this.basketItemModel({
          basketId: data.basketId,
          itemId: data.itemId,
          count: data.count,
        });
        Item.save();
        return Item;
      }
    }
    this.basketModel.update(
      { totalPrice: BasketCheck.totalPrice + ItemCheck.price * data.count },
      { where: { id: data.basketId } }
    );
  }

  async RemoveItemInBasket(data: RemoveBasketITem) {
    const Item = await this.basketItemModel.findOne({
      where: {
        itemId: data.itemId,
        basketId: data.basketId,
      },
    });
    const BasketCheck = await this.basketModel.findOne({
      where: {
        id: data.basketId,
      },
    });
    const ItemCheck = await this.itemModel.findOne({
      where: {
        id: data.itemId,
      },
    });

    if (!!data.itemId || !!data.basketId) {
      if (Item.count == data.count) {
        this.basketItemModel.destroy({
          where: {
            itemId: data.itemId,
            basketId: data.basketId,
          },
        });
      } else {
        this.basketModel.update(
          { totalPrice: BasketCheck.totalPrice - ItemCheck.price * data.count },
          { where: { id: data.basketId } }
        );
      }
    }
  }

  async Order(data: Order) {
    const BasketCheck = await this.basketModel.findOne({
      where: {
        id: data.basketId,
      },
    });
    const basketItemCheck = await this.basketItemModel.findAll({
      where: {
        basketId: data.basketId,
      },
    });
    basketItemCheck.map((x) => {
      this.BillDetailModel.create({
        basketId: x.basketId,
        totalPrice: x.Item.price,
        qty: x.count,
      });
    });
    // const bill = new this.BillDetailModel({
    //   basketId: data.basketId,
    //   totalPrice: BasketCheck.totalPrice,
    //   qty: BasketItemCheck
    // })

    // const BillItem = new this.BillItemModel({

    // })
  }
}
