import { Test, TestingModule } from '@nestjs/testing';
import { EscenaryService } from './escenary.service';

describe('EscenaryService', () => {
  let service: EscenaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EscenaryService],
    }).compile();

    service = module.get<EscenaryService>(EscenaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
