import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from '../decorators/is-password.decorator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsPassword()
  password: string;
}
