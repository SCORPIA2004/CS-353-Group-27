import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { decode } from '@/encryption/encoding';

export class JWTUser {
  email: string;
  role: string;
  id: number;
}

@Injectable()
export class UsersGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const user : JWTUser = decode(token);

    if (user) {
      request['user'] = user;
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
