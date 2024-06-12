import { Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-Sensor.dto';
import { UpdateSensorDto } from './dto/update-Sensor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from './entities/Sensor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
  ) {}
  create(createSensorDto: CreateSensorDto) {
    this.sensorRepository.create(createSensorDto);
    return this.sensorRepository.save(createSensorDto);
  }

  findAll() {
    return this.sensorRepository.find();
  }

  findOne(id: number) {
    return this.sensorRepository.findOneBy({ id });
  }

  update(id: number, updateSensorDto: UpdateSensorDto) {
    return this.sensorRepository.update(id, updateSensorDto);
  }

  remove(id: number) {
    return this.sensorRepository.delete(id);
  }
}
