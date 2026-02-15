import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Incorrect Email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'password must be at least 6 characters' })
  password: string;
}
