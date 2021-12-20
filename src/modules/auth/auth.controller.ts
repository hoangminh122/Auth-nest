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
import { LocalAuthGuard } from './repository/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseGuards(AuthGuard('local'))
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ status: 200, description: 'Create new user success !.' })
  // @ApiBody({ type: [UserEntity] })
  async login(@Body() user: AuthDTO, @Request() req) {
    let result = null;
    result = await this.authService.login(user, req);
    return result;
    // res.status(200).send("UnauthorizedException");
    // throw new UnauthorizedException();
  }
}
