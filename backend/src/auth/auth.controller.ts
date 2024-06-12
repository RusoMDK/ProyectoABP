import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request as HttpRequest } from 'express';
import { AuthService } from './providers/auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from 'src/function/GlobalFunctions';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: HttpRequest) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
