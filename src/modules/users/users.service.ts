import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { User } from "src/entities/User";
import { InjectModel } from "@nestjs/sequelize";
import { UserDTO } from "./dto/user.dto";
@Injectable()
export class UserService {
    private saltRounds = 10;

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,

    ) { }

    async showAll(): Promise<User[]> {
        return await this.userRepository.findAll<User>();
    }

    async findById(id: string): Promise<User> {
        let user = await this.userRepository.findOne({
            where: {
                id
            }
        });
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        let user = await this.userRepository.findOne({
            where: {
                email
            }
        });
        return user;
    }

    async create(data: UserDTO) {
        data.password = await this.getHash(data.password);
        try{
            const user = await this.userRepository.create(data);
            return user;

        }
       catch(err) {
        throw new HttpException({
            statusCode: HttpStatus.NOT_ACCEPTABLE,
            message: "Error. Please check the importing file : " + err
          }, HttpStatus.NOT_ACCEPTABLE);

       }
    }

    async update(id: string, data: UserDTO) {
        try {
            let todo = await this.userRepository.findOne({
                where: {
                    id
                }
            });
            if (!todo.id) {
                // tslint:disable-next-line:no-console
                // console.error('user doesn\'t exist');
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: "Can not found user"
                }, HttpStatus.NOT_FOUND)
            }
            await this.userRepository.update(data, { where: { id } });
            return await this.userRepository.findOne({
                where: {
                    id
                }
            });
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'update database error'
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: string) {
        await this.userRepository.destroy({
            where: {
                id
            },
            // force:true
        })
        return { deleted: true };
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }


}