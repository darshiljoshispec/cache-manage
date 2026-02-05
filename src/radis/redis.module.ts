import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: () => {
        const redis = new Redis({
          host: 'localhost',
          port: 6379,
        });

        redis.on('connect', () => {
          console.log('✅ Redis Connected');
        });

        return redis;
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
