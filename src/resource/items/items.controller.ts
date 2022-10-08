import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AddItem } from './dto/Item.dto';
import { ItemDetail } from './dto/Item.dto';
import { SearchByCat } from './dto/Item.dto';
import { ItemService } from './items.service';

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
  addItem(@Body() addItem: AddItem) {
    return this.itemService.addItem(addItem)
  }
}