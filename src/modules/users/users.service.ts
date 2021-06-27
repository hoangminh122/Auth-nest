import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';


@Injectable()
export class UsersService {

    private readonly users = [
        {
            userId:1,
            username:'minh',
            password:'123',
        },
        {
            userId:2,
            username:'maria',
            password:'guess',
        }
    ];

    async findOne(username:string) :Promise<User |undefined> {
        return this.users.find(user =>user.username === username);
    }

}
