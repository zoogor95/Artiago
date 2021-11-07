import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { ItemDto } from './createItemDto';

@Controller('items')
export class ItemController {
    
    constructor(private service: ItemService) { }

    @Get(':id')
    async get(@Param() params) {
        return await this.service.getItem(params.id);
    }

    @Get()
    async getAll() {
        return await this.service.getItems();
    }

    @Post()
    async create(@Body() item: Item) {
        if(item.id) {
            return await this.service.updateItem(item);
        }
        return await this.service.createItem(item);
    }

    @Delete(':id')
    async deleteItem(@Param() params) {
        return await this.service.deleteItem(params.id);
    }
}
