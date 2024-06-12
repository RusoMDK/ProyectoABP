import { Injectable } from '@nestjs/common';
import { CreateDataSensorDto } from './dto/create-data-sensor.dto';
import { UpdateDataSensorDto } from './dto/update-data-sensor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Data_Sensor } from './entities/data-sensor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DataSensorService {
  constructor(
    @InjectRepository(Data_Sensor)
    private readonly dataRepository: Repository<Data_Sensor>,
  ) {}

  create(createDataSensorDto: CreateDataSensorDto) {
    const data = this.dataRepository.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createDataSensorDto,
    });
    return this.dataRepository.save(data);
  }

  findAll() {
    return this.dataRepository.find();
  }

  findOne(id: number) {
    return this.dataRepository.findOneBy({ id });
  }

  update(id: number, updateDataSensorDto: UpdateDataSensorDto) {
    return this.dataRepository.update(id, updateDataSensorDto);
  }

  remove(id: number) {
    return this.dataRepository.delete(id);
  }
}
