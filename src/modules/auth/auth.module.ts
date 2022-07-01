import { CacheInterceptor, CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../users/users.service';
import { LocalStrategy } from './repository/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt-secret.constant';
import { JwtStrategy } from './jwt/jwt-strategy';
import { userRepository } from '../database/repository.database.provider';
import { DatabaseModule } from '../database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { BlackListInterceptor } from 'src/shared/interceptor/black-list.interceptor';

@Module({
  imports:[
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'10m'}
    }),
    CacheModule.register({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: process.env.CACHE_TTL,
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    userRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: BlackListInterceptor,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
