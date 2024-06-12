import { Test, TestingModule } from '@nestjs/testing';
import { DataSensorService } from './data-sensor.service';

describe('DataSensorService', () => {
  let service: DataSensorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSensorService],
    }).compile();

    service = module.get<DataSensorService>(DataSensorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
