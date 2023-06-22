import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/auth.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'auth_service',
      username: 'postgres',
      password: 'password',
      entities: [Auth],
      synchronize: process.env.NODE_ENV != 'production',
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
