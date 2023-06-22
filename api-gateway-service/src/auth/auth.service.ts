import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

interface AuthServiceClient {
  register(data: { email: string; password: string }): Observable<any>;
  login(data: { email: string; password: string }): Observable<any>;
  validate(data: { token: string }): Observable<any>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private service: AuthServiceClient;

  @Inject('AuthService')
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.service = this.client.getService<AuthServiceClient>('AuthService');
  }

  public register(body: any): Observable<string> {
    return this.service.register(body);
  }

  public login(body: any): Observable<string> {
    return this.service.login(body);
  }

  public async validate(token: string): Promise<any> {
    return firstValueFrom(this.service.validate({ token }));
  }
}
