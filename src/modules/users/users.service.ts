/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject, HttpException, HttpStatus, CACHE_MANAGER } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/User';
import { InjectModel } from '@nestjs/sequelize';
import { UserDTO } from './dto/user.dto';
import * as moment from 'moment';
import { UnitOfWork } from '../database/UnitOfWork';
import { Op } from 'sequelize';
import { QueryUserInput } from './dto/query-user.input';
import { Cache } from 'cache-manager';
import { CACHE_PREFIX } from 'src/shared/constant/cache-auth.constant';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @Inject(UnitOfWork)
    private readonly unitOfWork: UnitOfWork,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async showAll(filter: QueryUserInput): Promise<User[]> {
    const condition = 
    {
        [Op.and]: [
            filter.email ? {'email' : {[Op.iLike] : `%${filter.email}%` }} : {},
            filter.name ? { [Op.or] : 
                [
                    {
                        'first_name' : {[Op.iLike] : `%${filter.name}%` }
                    },
                    {
                        'last_name' : {[Op.iLike] : `%${filter.name}%` }
                    }
                ] 
            } 
            : {},
        ]
    };

    const orderDefault = [['created_at','DESC']];
    const order = filter.sortBy ? [filter.sortBy, filter.sortType ? filter.sortType : 'DESC'] : [];
    if(order.length > 0)
      orderDefault.push(order);
    
    return await this.userModel.findAll<User>({
      offset: filter.page ? filter.page - 1 : 0,
      limit: filter.limit,
      where: condition,
      include: [],
      order: JSON.parse(JSON.stringify(orderDefault)),
    });
  }

  async findById(id: string): Promise<any> {
    const user = await this.userModel.findOne({
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
    const user = await this.userModel.findOne({
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
      return await this.userModel.create(data);
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
        let todo = await this.userModel.findOne({
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
        await this.userModel.update(data, { where: { id } });
        return await this.userModel.findOne({
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
    await this.userModel.destroy({
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
