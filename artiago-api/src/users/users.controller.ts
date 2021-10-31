import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('user')
export class UsersController {

    constructor(private service: UsersService) { }

    @Get(':id')
    async get(@Param() params) {
        return await this.service.getUser(params.id);
    }

    @Get()
    async getAll() {
        return await this.service.getUsers();
    }

    @Post()
    async create(@Body() user: User) {
        if(user.id) {
            return await this.service.updateUser(user);
        }
        return this.service.createUser(user);
    }

    @Delete(':id')
    async deleteUser(@Param() params) {
        return await this.service.deleteUser(params.id);
    }
}