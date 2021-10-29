import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryDto } from './createCategoryDto';

@Controller('category')
export class CategoryController {
    
    constructor(private service: CategoryService) { }

    @Get(':id')
    async get(@Param() params) {
        return await this.service.getCategory(params.id);
    }

    @Get()
    async getAll() {
        return await this.service.getCategories();
    }

    @Post()
    async create(@Body() category: CategoryDto) {
        return await this.service.createCategory(category);
    }

    @Put()
    async update(@Body() category: Category) {
        return await this.service.updateCategory(category);
    }

    @Delete(':id')
    async deleteCategory(@Param() params) {
        return await this.service.deleteCategory(params.id);
    }
}
