import { CacheInterceptor, CACHE_KEY_METADATA, CACHE_MANAGER, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs';
import { CACHE_PREFIX } from '../constant/cache-auth.constant';

@Injectable()
export class BlackListInterceptor extends CacheInterceptor {

    trackBy(context: ExecutionContext): string | undefined {
        console.log("BlackListInterceptor")
        const cacheKey = this.reflector.get(
          CACHE_KEY_METADATA,
          context.getHandler(),
        );
     
        if (cacheKey) {
          const request = context.switchToHttp().getRequest();
          return `${cacheKey}-${request._parsedUrl.query}`;
        }
     
        return super.trackBy(context);
      }

      async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        console.log('Before...');
        const cacheKey = this.reflector.get(
          CACHE_MANAGER,
          context.getHandler(),
        );

        // await this.cacheManager
        console.log(await this.cacheManager.get(`${CACHE_PREFIX.BLACKLIST_TOKEN}`))
        console.log('Before...');
        // if (cacheKey) {
        //   const request = context.switchToHttp().getRequest();
        //   // return `${cacheKey}-${request._parsedUrl.query}`;
        // }
        return next.handle();
      }
}