import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  UseGuards,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUserRole } from 'src/auth/auth.request.interface';

interface UserServiceClient {
  updateUser(data: {
    email: string;
    profileImage: string;
    address: string;
  }): Observable<any>;
  findUserProfile(data: { email: string }): Observable<any>;
}

@Controller('user')
export class UserController implements OnModuleInit {
  private svc: UserServiceClient;

  @Inject('UserService')
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<UserServiceClient>('UserService');
  }

  @Post('update')
  @UseGuards(AuthGuard)
  private async updateUser(
    @Body() body: any,
    @Req() req: RequestWithUserRole,
  ): Promise<Observable<any>> {
    return this.svc.updateUser({ ...body, email: req.email });
  }

  @Get()
  @UseGuards(AuthGuard)
  private async findUserProfile(@Req() req: RequestWithUserRole): Promise<any> {
    return this.svc.findUserProfile({ email: req.email });
  }
}
