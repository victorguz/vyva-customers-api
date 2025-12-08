import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'nestjs-dynamoose';
import { User, UserKey } from 'src/app/schemas/user.schema';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private readonly model;
    constructor(jwtService: JwtService, model: Model<User, UserKey>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
