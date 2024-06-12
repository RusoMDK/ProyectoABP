import { Test, TestingModule } from '@nestjs/testing';
import { EscenaryController } from './escenary.controller';
import { EscenaryService } from './escenary.service';

describe('EscenaryController', () => {
  let controller: EscenaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscenaryController],
      providers: [EscenaryService],
    }).compile();

    controller = module.get<EscenaryController>(EscenaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
