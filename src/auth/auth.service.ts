import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    const isCorrectPassword = await bcrypt.compare(
      password,
      user?.password ?? '',
    );
    if (user && isCorrectPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async logIn(user: Omit<User, 'password'>) {
    return {
      // Here the JWT secret key that's used for signing the payload
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
