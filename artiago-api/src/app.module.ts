import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'artiago_db',
      entities: [User, Category],
      synchronize: true,
    }),
    UsersModule,
    CategoryModule
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}