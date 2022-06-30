import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  ValidationPipe,
  UnauthorizedException,
  Param,
  Headers,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlackListInterceptor } from 'src/shared/interceptor/black-list.interceptor';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { RegisterDTO } from './dto/register.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
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

  @Post('logout/:id')
  @UseInterceptors(BlackListInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Logout' })
  async logout(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Headers('Authorization') token: string
  ) {
    return this.authService.logout(id, token);
  }
}
