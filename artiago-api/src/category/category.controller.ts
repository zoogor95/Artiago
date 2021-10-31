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
    async create(@Body() category: Category) {
        if(category.id) {
            return await this.service.updateCategory(category);
        }
        return await this.service.createCategory(category);
    }

    @Delete(':id')
    async deleteCategory(@Param() params) {
        return await this.service.deleteCategory(params.id);
    }
}
