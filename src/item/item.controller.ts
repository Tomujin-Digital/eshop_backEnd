import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { itemDetailDto } from 'src/dto/detail-item.dto';
import { ItemService } from './item.service';

@Controller('/item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}
    @Get('/items')
    getItems(){
        return this.itemService.items()
      }
}