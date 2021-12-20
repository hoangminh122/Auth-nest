import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/users.service';
@Injectable()
export class AuthService {
  private saltRounds = 10;
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let comparePassword = null;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Username or password invalid: ',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    comparePassword = await this.comparePassword(password, user.password);

    if (comparePassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userObj: any, req: any) {
    let result = null;
    const payload = { email: userObj.email };
    const user = await this.validateUser(userObj.email, userObj.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    result = {
      access_token: await this.jwtService.sign(payload),
    };
    return result;
  }

  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(
    attempt: string | undefined,
    passwordHash: string | undefined,
  ): Promise<boolean> {
    let result = await bcrypt.compare(attempt, passwordHash);
    return result;
  }
}
