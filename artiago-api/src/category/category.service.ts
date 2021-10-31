
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, IsNull, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Category } from './category.entity';
import { CategoryDto } from './createCategoryDto';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async getCategories(): Promise<any[]> {
        return await this.categoryRepository.findAndCount();
    }

    async getCategory(_id: number): Promise<Category> {
        return await this.categoryRepository.findOne({
            select: ["name"],
            where: [{ "id": _id }]
        });
    }

    async updateCategory(category: Category) {
        let where: FindConditions<Category> = { id: category.id }
        delete category.id;
        return await this.categoryRepository.update(where, category);
    }

    async createCategory(category: Category) {
        return await this.categoryRepository.insert(category);
    }

    async deleteCategory(category: number) {
        return await this.categoryRepository.softDelete(category);
    }
}

