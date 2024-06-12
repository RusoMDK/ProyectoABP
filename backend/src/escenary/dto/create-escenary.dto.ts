import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateEscenaryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  user: User;
}
