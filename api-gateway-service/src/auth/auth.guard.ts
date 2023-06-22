import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestWithUserRole } from './auth.request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly service: AuthService;

  async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: RequestWithUserRole = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) throw new UnauthorizedException();

    const bearer: string[] = authorization.split(' ');
    if (!bearer || bearer.length < 2) throw new UnauthorizedException();

    const token: string = bearer[1];
    const { status, userId, email } = await this.service.validate(token);

    req.user = userId;
    req.email = email;

    if (status !== HttpStatus.OK) throw new UnauthorizedException();

    return true;
  }
}
