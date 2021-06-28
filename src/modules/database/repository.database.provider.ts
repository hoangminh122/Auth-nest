import { User } from "src/entities/User";

export const userRepository = {
    provide:'UserRepository',
    useValue:User
}
