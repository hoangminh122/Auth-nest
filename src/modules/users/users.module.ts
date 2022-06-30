import { CacheInterceptor, CacheModule, forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/jwt/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwt/jwt-secret.constant';
import { UserService } from './users.service';
import { userRepository } from '../database/repository.database.provider';
import { DatabaseModule } from '../database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { BlackListInterceptor } from 'src/shared/interceptor/black-list.interceptor';

@Module({
  imports: [
    DatabaseModule,
    CacheModule.register({
      imports: [AuthModule],
      inject: [ConfigService],
      store: redisStore
    }),
  ],
  providers: [
    UserService,
    userRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: BlackListInterceptor,
    }  
  ],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
