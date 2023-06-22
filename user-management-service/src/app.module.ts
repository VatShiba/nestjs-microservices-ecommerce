import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'user_service',
      username: 'postgres',
      password: 'password',
      entities: [User],
      synchronize: process.env.NODE_ENV != 'production',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
