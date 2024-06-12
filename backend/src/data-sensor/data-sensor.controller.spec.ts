import { Test, TestingModule } from '@nestjs/testing';
import { DataSensorController } from './data-sensor.controller';
import { DataSensorService } from './data-sensor.service';

describe('DataController', () => {
  let controller: DataSensorController;
  let service: DataSensorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSensorController],
      providers: [
        {
          provide: DataSensorService,
          useValue: {
            create: jest.fn().mockResolvedValue('someValue'),
            findAll: jest.fn().mockResolvedValue('someValue'),
            update: jest.fn().mockResolvedValue('someValue'),
          },
        },
      ],
    }).compile();

    controller = module.get<DataSensorController>(DataSensorController);
    service = module.get<DataSensorService>(DataSensorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with the correct parameters', async () => {
      const data = 6;
      const type = 'asdasd';
      await controller.create({ type, data });
      expect(service.create).toHaveBeenCalledWith({ type, data });
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with the correct parameters', async () => {
      await controller.findAll();
      expect(service.findAll);
    });
  });

  describe('update', () => {
    it('should call service.update with the correct parameters', async () => {
      const data = 6;
      const id = 40;
      const type = 'asdasd';
      await controller.update(id, { type, data });
      expect(service.update).toHaveBeenCalledWith(id, {
        type,
        data,
      });
    });
  });
});
