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
    return this.sensorRepository
      .createQueryBuilder('sensor')
      .leftJoinAndSelect('sensor.device', 'device')
      .leftJoinAndSelect('device.user', 'user')
      .select([
        'sensor.id AS id',
        'sensor.type AS type',
        'sensor.description AS description',
        'user.name AS username',
      ])
      .getRawMany();
  }

  findByUser(userId: number) {
    return this.sensorRepository
      .createQueryBuilder('sensor')
      .leftJoinAndSelect('sensor.device', 'device')
      .leftJoinAndSelect('device.user', 'user')
      .leftJoinAndSelect('sensor.escenary', 'escenary')
      .select([
        'sensor.id AS id',
        'sensor.type AS type',
        'sensor.description AS description',
        'device.name AS deviceName',
        'escenary.name AS escenaryName',
      ])
      .where('user.id = :id', { id: userId })
      .getRawMany();
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
