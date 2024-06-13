import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../dto/login.dto';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<void> {
    const { name, username, email, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Asignar rol por defecto si no se proporciona uno
    let userRole = role;
    if (!userRole) {
      userRole = await this.roleRepository.findOne({ where: { name: 'user' } });
    }

    const user = this.userRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: userRole,
    });
    await this.userRepository.save(user);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findOneUsername(username);

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN);
    }

    const payload = { id: user.id, name: user.username, role: user.role.id }; // Incluir rol en el payload
    const token = this.jwtService.sign(payload);

    return {
      user,
      token,
    };
  }
}
