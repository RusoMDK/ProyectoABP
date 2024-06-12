import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    this.userService.create(createUserDto);
  }

  async validateUser(username: string, pass: string): Promise<any> {

    const user = await this.userService.findOneUsername(username);
    const usuario = await bcrypt.compare(pass, user.password);
    if (user && usuario) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);
    const usuario = await this.userService.findOneUsername(user.username);
    console.log(usuario.role.name);
    const secret = this.configService.get<string>('JWT_SECRET');
    const role = usuario.role.name;
    const payload = {
      username: user.username,
      sub: user.id,
      role: role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, { secret }),
    };
  }
}
