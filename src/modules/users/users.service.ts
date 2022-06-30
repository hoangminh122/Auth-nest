/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject, HttpException, HttpStatus, CACHE_MANAGER } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/User';
import { InjectModel } from '@nestjs/sequelize';
import { UserDTO } from './dto/user.dto';
import * as moment from 'moment';
import { UnitOfWork } from '../database/UnitOfWork';
import { Cache } from 'cache-manager';
import { CACHE_PREFIX } from 'src/shared/constant/cache-auth.constant';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    @Inject(UnitOfWork)
    private readonly unitOfWork: UnitOfWork,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async showAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findById(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user)
      throw new HttpException(
        {
          success: false,
          error: 'NOT_FOUND',
        },
        HttpStatus.NOT_FOUND, 
      );
    user.password = null;
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async create(data: UserDTO) {
    data.password = await this.getHash(data.password);
    try {
      data.createdAt = moment().toDate();
      return await this.userRepository.create(data);
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          error: 'SERVICE_UNAVAILABLE',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async update(id: string, data: UserDTO) {
    try {
      return this.unitOfWork.scope(async transaction => {
        let todo = await this.userRepository.findOne({
          where: {
            id,
          },
        });
        if (!todo.id) {
          throw new HttpException(
            {
              success: false,
              error: 'NOT_FOUND',
            },
            HttpStatus.NOT_FOUND,
          );
        }
        await this.userRepository.update(data, { where: { id } });
        return await this.userRepository.findOne({
          where: {
            id,
          },
        });
      })
    } catch (e) {
      throw new HttpException(
        {
          success: false,
          error: 'INTERNAL_SERVER_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async destroy(id: string) {
    await this.userRepository.destroy({
      where: {
        id,
      },
      // force:true
    });
    return { deleted: true };
  }

  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
}
