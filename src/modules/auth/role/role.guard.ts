// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { Observable } from "rxjs";
// import { Role } from "src/shared/enums/role-enum";
// import { Test } from "src/shared/redis/test.constant";
// import { Roles, ROLES_KEY } from "./roles.decorator";

// @Injectable()
// export class RolesGuard implements CanActivate {
//     constructor(private reflector: Reflector) {}

//     canActivate(context: ExecutionContext): boolean {
//         console.log("vao day");
//         const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//         context.getHandler(),
//         context.getClass(),
//         ]);
//         if (!requiredRoles) {
//         return true;
//         }
//         const { user } = context.switchToHttp().getRequest();
//         Test.role = requiredRoles;
//         console.log("role",Test.role)
//         // console.log(context.switchToHttp().getRequest())
//         // return requiredRoles.some((role) => user.roles?.includes(role));
//         return true;
//     }

// }