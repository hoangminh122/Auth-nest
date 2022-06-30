import { CacheInterceptor, CacheModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/users/users.module';
import { BlackListInterceptor } from './shared/interceptor/black-list.interceptor';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
     CacheModule.register({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: process.env.CACHE_TTL,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: BlackListInterceptor,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log("MiddlewareConsumer")
    // consumer
    //   .apply(BlackListInterceptor)
    //   .forRoutes('*');
  }
}
