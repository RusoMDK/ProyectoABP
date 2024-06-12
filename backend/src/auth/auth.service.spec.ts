import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './providers/auth.service';
import { XalixUser } from 'src/user/entities/XalixUser';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [XalixUser],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
