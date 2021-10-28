
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './createCategoryDto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async getCategory(_id: number): Promise<Category> {
        return await this.categoryRepository.findOne({
            select: ["name"],
            where: [{ "id": _id }]
        });
    }

    async updateCategory(category: Category) {
        this.categoryRepository.save(category)
    }

    async deleteCategory(category: Category) {
        this.categoryRepository.delete(category);
    }

    async createCategory(category: CategoryDto) {
        this.categoryRepository.create(category);
    }
}