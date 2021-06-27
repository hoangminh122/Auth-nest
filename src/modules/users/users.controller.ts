import { Controller, Get, UseGuards,Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {

    constructor(){

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    test(@Request() req){
        return "ok"
    }


}
