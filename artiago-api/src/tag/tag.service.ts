import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
    
    constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) { }

    async getTags(): Promise<any[]> {
        return await this.tagRepository.findAndCount();
    }

    async getTag(_id: number): Promise<Tag> {
        return await this.tagRepository.findOne({
            select: ["id", "name", "description", "category_id"],
            where: [{ "id": _id }]
        });
    }

    async updateTag(tag: Tag) {
        let where: FindConditions<Tag> = { id: tag.id }
        delete tag.id;
        return await this.tagRepository.update(where, tag);
    }

    async createTag(tag: Tag) {
        return await this.tagRepository.insert(tag);
    }

    async deleteTag(tag: number) {
        return await this.tagRepository.softDelete(tag);
    }
}
