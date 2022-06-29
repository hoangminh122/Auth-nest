import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './jwt-secret.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //role
    // const roles = Test.role;
    // // console.log(context.switchToHttp().getRequest())
    // const isHasRole = roles.some((role) => payload.roles?.includes(role));
    // if (!isHasRole) {
    //   throw new UnauthorizedException();
    // }
    //end role

    if (!payload) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
