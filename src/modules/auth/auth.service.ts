import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { User } from 'src/entities/User';
import { IErrorResponse } from 'src/shared/response/error-res';
import { IResponse } from 'src/shared/response/interface/response.interface';
import { ISuccessResponse } from 'src/shared/response/success-res';
import { UnitOfWork } from '../database/UnitOfWork';
import { UserService } from '../users/users.service';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  private saltRounds = 10;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(User)
    private userRepository: typeof User,
    @Inject(UnitOfWork)
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let comparePassword = null;
    const user = await this.userService.findByEmail(email);
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

  async register(userObj: any) {
    let result: IResponse = null;
    try {
      await this.unitOfWork.scope(async transaction => {
        //Find user
        const user = await this.userRepository.findOne({
          where: {
            [Op.or]: [
              { username: userObj.username },
              { email: userObj.email }
            ]
          },
        });

        if (user) {
          throw new HttpException(
            {
              success: false,
              error: 'USER_EXIST',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        const userNew = await this.userRepository.create(userObj);
        result = {
          success: true,
          result: userNew
        } as ISuccessResponse;
        
        return result;
      });
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'INTERNAL_SERVER_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

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
