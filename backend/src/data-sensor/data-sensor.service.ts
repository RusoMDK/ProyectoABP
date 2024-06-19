import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDataSensorDto } from './dto/create-data-sensor.dto';
import { UpdateDataSensorDto } from './dto/update-data-sensor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Data_Sensor } from './entities/data-sensor.entity';
import { Between, Repository } from 'typeorm';

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

  findLastDay(day: Date) {
    const parsedDay = new Date(day);

    console.log(day);

    if (isNaN(parsedDay.getTime())) {
      throw new BadRequestException(
        'Invalid date format. Expected format: YYYY-MM-DD',
      );
    }

    const startOfDay = new Date(day);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(day);
    endOfDay.setUTCHours(23, 59, 59, 999);

    console.log(startOfDay);
    console.log(endOfDay);

    return this.dataRepository.find({
      where: {
        createdAt: Between(startOfDay, endOfDay),
      },
    });
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
