import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('este es el username', username);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('El usuario no es valido');
    }
    return user;
  }
}
