import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { FindUserRequestDto, UpdateUserRequestDto } from './user.dto';
import { UserService } from './user.service';

const USER_SERVICE_NAME = 'UserService';

@Controller()
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @GrpcMethod(USER_SERVICE_NAME, 'FindUserProfile')
  private findUser(payload: FindUserRequestDto): Promise<any> {
    return this.service.findUser(payload);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'UpdateUser')
  private updateUser(payload: UpdateUserRequestDto): Promise<any> {
    return this.service.updateUser(payload);
  }
}
