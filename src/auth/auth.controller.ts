import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const validUser = await this.authService.validateUser(email, password);

    if (!validUser)
      throw new UnauthorizedException('Email or password is incorrect.');

    return await this.authService.logIn(validUser);
  }
}
