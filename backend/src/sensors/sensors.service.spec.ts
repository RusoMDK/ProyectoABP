import { Test, TestingModule } from '@nestjs/testing';
import { SensorService } from './sensors.service';

describe('SensorsService', () => {
  let service: SensorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorService],
    }).compile();

    service = module.get<SensorService>(SensorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
