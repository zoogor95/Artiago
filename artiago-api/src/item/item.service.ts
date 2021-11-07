
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, IsNull, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Item } from './item.entity';
import { ItemDto } from './createItemDto';

@Injectable()
export class ItemService {

    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) { }

    async getItems(): Promise<any[]> {
        return await this.itemRepository.findAndCount();
    }

    async getItem(_id: number): Promise<Item> {
        return await this.itemRepository.findOne({
            select: ["id", "name"],
            where: [{ "id": _id }]
        });
    }

    async updateItem(item: Item) {
        let where: FindConditions<Item> = { id: item.id }
        delete item.id;
        return await this.itemRepository.update(where, item);
    }

    async createItem(item: Item) {
        return await this.itemRepository.insert(item);
    }

    async deleteItem(item: number) {
        return await this.itemRepository.softDelete(item);
    }
}

