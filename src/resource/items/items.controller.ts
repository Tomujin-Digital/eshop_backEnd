import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddBasketItem, BasketCheck, Order, RemoveBasketITem } from './dto/basket.dto';
import { AddNewItem } from './dto/Item.dto';
import { SearchByCat } from './dto/Item.dto';
import { ItemService } from './Items.service';
import { ReturnItemInBasket } from './dto/basket.dto'

@ApiTags('Item')
@Controller('/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get('/items')
  getItems(){
      return this.itemService.items()
    }
  @Post('/catoItems')
  catoItems(@Body() searchByCat: SearchByCat) {
    return this.itemService.searchbyCat(searchByCat)
  }
  @Post('/addItem')
  addItem(@Body() addNewItem: AddNewItem) {
    return this.itemService.addNewItem(addNewItem)
  }
  @Post('/AddItemToBasket')
  AddItemToBasket(@Body() addBasketItem: AddBasketItem) {
    return this.itemService.AddItemInBasket(addBasketItem)
  }
  @Post('/ReturnItemsInBasket')
  ReturnItemsInBasket(@Body() returnItemInBasket: ReturnItemInBasket) {
    return this.itemService.ReturnItemsInBasket(returnItemInBasket)
  }
  @Post('/BasketCheck')
  BasketCheck(@Body() basketCheck: BasketCheck) {
    return this.itemService.basketCheck(basketCheck)
  }
  @Post("RemoveItemFromBasket")
    RemoveItemFromBasket(@Body() removeBasketItem: RemoveBasketITem) {
      return this.itemService.RemoveItemInBasket(removeBasketItem)
    }
  @Post("/Order")
  Order(@Body() order:Order) {
    return this.itemService.Order(order)
  }
}