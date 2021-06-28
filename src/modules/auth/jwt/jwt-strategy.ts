import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { Test } from "src/shared/redis/test.constant";
import { jwtConstants } from "./jwt-secret.constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload:any) {
        //role
        let roles = Test.role;
        // console.log(context.switchToHttp().getRequest())
        let isHasRole = roles.some((role) => payload.roles?.includes(role));
        if(!isHasRole)
        {
            throw new UnauthorizedException();
        }
        //end role
        return {
            userId:payload.sub,
            username:payload.username
        };
    }

}