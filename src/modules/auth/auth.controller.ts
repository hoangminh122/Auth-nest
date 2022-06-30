import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { RegisterDTO } from './dto/register.dto';
import { LocalAuthGuard } from './repository/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseGuards(AuthGuard('local'))
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ status: 200, description: 'Login user' })
  async login(@Body() user: AuthDTO, @Request() req) {
    return this.authService.login(user, req);
  }

  @Post('register')
  @ApiResponse({ status: 200, description: 'Create new user' })
  async register(@Body() user: RegisterDTO) {
    return this.authService.register(user);
  }
}
