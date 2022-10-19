import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddBasketItem } from './dto/basket.dto';
import { AddNewItem } from './dto/Item.dto';
import { ItemDetail } from './dto/Item.dto';
import { SearchByCat } from './dto/Item.dto';
import { ItemService } from './items.service';
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
  @Post('/detail')
  detail(@Body() itemDetailDto: ItemDetail) {
    return this.itemService.detail(itemDetailDto)
  }
  @Post('/addItem')
  addItem(@Body() addNewItem: AddNewItem) {
    return this.itemService.addNewItem(addNewItem)
  }
  @Post('/AddItemToBasket')
  AddItemToBasket(@Body() addBasketItem: AddBasketItem) {
    return this.itemService.AddItemToBasket(addBasketItem)
  }
  @Post('/ReturnItemsInBasket')
  ReturnItemsInBasket(@Body() returnItemInBasket: ReturnItemInBasket) {
    return this.itemService.ReturnItemsInBasket(returnItemInBasket)
  }
}