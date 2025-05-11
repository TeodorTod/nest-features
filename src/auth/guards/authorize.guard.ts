import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizeGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
         const request: Request = context.switchToHttp().getRequest();
         const token = request.headers.authorization?.split(' ')[1];
        //  if (!token) {
        //     throw new UnauthorizedException('Token not provided');
        //  }
        //  const jwtService = new JwtService();
        //  const decodedToken = jwtService.verify(token);
        //  if (!decodedToken) {
        //     throw new UnauthorizedException('Invalid token');
        //  }
        return true;
    }
}