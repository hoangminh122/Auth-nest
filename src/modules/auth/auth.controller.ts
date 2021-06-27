import { Controller, Post, UseGuards,Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/input.dto';
import { LocalAuthGuard } from './repository/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){

    }
    // @UseGuards(AuthGuard('local'))
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() req:LoginDto,@Request() reqToken) {
        return this.authService.login(req,reqToken);
    }
}
