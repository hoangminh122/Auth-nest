import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    CacheModule.register()
  ],
  controllers: [AuthController],
  providers: [
    {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
