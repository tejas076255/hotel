import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async (configService: ConfigService) => {
        const redisClient = new Redis({
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('REDIS_DB', 0),

          // Retry strategy
          retryStrategy: (times: number) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },

          // Reconnect on error
          reconnectOnError: (err) => {
            const targetError = 'READONLY';
            if (err.message.includes(targetError)) {
              // Chỉ reconnect khi gặp lỗi READONLY
              return true;
            }
            return false;
          },

          // Connection settings
          maxRetriesPerRequest: null,
          enableReadyCheck: false,
          enableOfflineQueue: false,

          // Timeouts
          connectTimeout: 2000, // 2 seconds
          commandTimeout: 2000, // 2 seconds

          // Keepalive
          keepAlive: 30000, // 30 seconds

          lazyConnect: true,
        });

        // Event listeners
        redisClient.on('connect', () => {
          console.log(' Redis::: Connecting...');
        });

        redisClient.on('ready', () => {
          console.log(' Redis::: Ready to accept commands');
        });

        redisClient.on('error', (err) => {
          // Suppress offline error output in logs
        });

        redisClient.on('close', () => {
          // Suppress close log
        });

        redisClient.on('reconnecting', (delay: number) => {
          // Suppress reconnect log
        });

        redisClient.on('end', () => {
          // Connection ended
        });

        // Test connection gracefully
        try {
          await redisClient.connect();
          await redisClient.ping();
          console.log(' Redis:::: Connected successfully!');
        } catch (error) {
          console.warn('⚠️ Redis connection unavailable. App will run in direct database mode.');
        }

        return redisClient;
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
