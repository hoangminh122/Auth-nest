import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/jwt/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/jwt/jwt-secret.constant';
import { UserService } from './users.service';
import { userRepository } from '../database/repository.database.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports:[
    DatabaseModule
],
  providers: [
    UserService,
    userRepository
],
  controllers: [UsersController,],
  exports:[UserService]
})
export class UserModule {}
