import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AddItem } from './dto/Item.dto';
import { itemDetailDto } from 'src/dto/detail-item.dto';
import { categorySearch } from 'src/dto/item-Search.dto';
import { ItemService } from './item.service';

@Controller('/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Get('/items')
  getItems(){
      return this.itemService.items()
    }
  @Post('/catoItems')
  catoItems(@Body() categorySearch: categorySearch) {
    return this.itemService.searchbyCat(categorySearch)
  }
  @Post('/detail')
  detail(@Body() itemDetailDto: itemDetailDto) {
    return this.itemService.detail(itemDetailDto)
  }
  @Post('/addItem')
  addItem(@Body() addItem: AddItem) {
    return this.itemService.addItem(addItem)
  }
}