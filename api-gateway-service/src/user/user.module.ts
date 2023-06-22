import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UserService',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: 'user',
          protoPath: 'proto/user.proto',
        },
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
})
export class UserModule {}
