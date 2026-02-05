import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const redis = new Redis({
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
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
