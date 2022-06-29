import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
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

@Module({
  imports:[
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'10m'}
    }),
    CacheModule.register()
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    userRepository
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
