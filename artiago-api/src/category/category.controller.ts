import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryDto } from './createCategoryDto';

@Controller('category')
export class CategoryController {
    
    constructor(private service: CategoryService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getCategory(params.id);
    }

    @Get()
    getAll() {
        return this.service.getCategories();
    }

    @Post()
    create(@Body() category: CategoryDto) {
        return this.service.createCategory(category);
    }

    @Put()
    update(@Body() category: Category) {
        return this.service.updateCategory(category);
    }

    @Delete(':id')
    deleteCategory(@Param() params) {
        return this.service.deleteCategory(params.id);
    }
}
