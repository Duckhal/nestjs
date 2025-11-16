import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token không hợp lệ hoặc bị thiếu');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'BI_MAT',
      });
      if (payload.role === 'admin') {
        return true;
      } else {
        throw new UnauthorizedException('Không đủ quyền');
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
