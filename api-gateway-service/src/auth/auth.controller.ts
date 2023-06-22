import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  private register(@Body() body: any): Observable<any> {
    return this.authService.register(body);
  }

  @Post('login')
  private login(@Body() body: any): Observable<any> {
    return this.authService.login(body);
  }
}
