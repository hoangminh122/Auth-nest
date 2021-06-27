import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './repository/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt-secret.constant';
import { JwtStrategy } from './jwt/jwt-strategy';

@Module({
  imports:[
    UsersModule,
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'10m'}
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
