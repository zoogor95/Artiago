import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { useStaticAssets } from '@nestjs/serve-static/dist/serve-static.module';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { EventModule } from './event/event.module';
import { EventUserModule } from './event-user/event-user.module';
import { TagModule } from './tag/tag.module';
import { Event } from './event/event.entity';
import { EventUser } from './event-user/event-user.entity';
import { Tag } from './tag/tag.entity';
import { Video } from './video/video.entity';
import { VideoModule } from './video/video.module';
import { Item } from './item/item.entity';
import { ItemModule } from './item/item.module';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'artiago_db',
      entities: [User, Category, Event, EventUser, Tag, Video, Item],
      synchronize: true,
    }),
    UsersModule,
    CategoryModule,
    EventModule,
    EventUserModule,
    TagModule,
    VideoModule,
    ItemModule
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
