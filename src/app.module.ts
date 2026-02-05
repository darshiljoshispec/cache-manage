import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { CoursesModule } from './courses/courses.module';

import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { RedisModule } from './radis/redis.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://darshil2015:e96nVB9g8eMATAMv@cluster0.yi5y6i5.mongodb.net/microservicenest',
    ),

    RedisModule,

    CoursesModule,
  ],
})
export class AppModule {}
