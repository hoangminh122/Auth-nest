import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/User';
import { Role } from 'src/shared/enums/role-enum';
import { log } from 'util';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Roles } from '../auth/role/roles.decorator';
import { UserDTO } from './dto/user.dto';
import { UserService } from './users.service';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  showAllUser() {
    return this.userService.showAll();
  }

  @Get('GetById/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async showUserById(@Param('id') id: string) {
    const result = await this.userService.findById(id);
    return {
      code: 200,
      success: true,
      message: 'success',
      result,
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async destroyUser(@Param('id') id: string) {
    return this.userService.destroy(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userService.update(id, data);
  }
}
