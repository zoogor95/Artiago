import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<any[]> {
        return await this.usersRepository.findAndCount();
    }

    async getUser(_id: number): Promise<User> {
        return await this.usersRepository.findOne({
            select: ["id", "username", "type"],
            where: [{ "id": _id }]
        });
    }

    async createUser(user: User) {
        return await this.usersRepository.insert(user)
    }

    async updateUser(user: User) {
        let where: FindConditions<User> = { id: user.id }
        delete user.id;
        return await this.usersRepository.update(where, user);
    }

    async deleteUser(user: User) {
        return await this.usersRepository.softDelete(user);
    }
}
