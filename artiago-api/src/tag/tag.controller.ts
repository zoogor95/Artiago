import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {

    constructor(private service: TagService) { }

    @Get(':id')
    async get(@Param() params) {
        return await this.service.getTag(params.id);
    }

    @Get()
    async getAll() {
        return await this.service.getTags();
    }

    @Post()
    async create(@Body() tag: Tag) {
        if(tag.id) {
            return await this.service.updateTag(tag);
        }
        return this.service.createTag(tag);
    }

    @Delete(':id')
    async deleteTag(@Param() params) {
        return await this.service.deleteTag(params.id);
    }
}
