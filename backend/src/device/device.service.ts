import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}
  create(createDeviceDto: CreateDeviceDto) {
    const device = this.deviceRepository.create(createDeviceDto);
    return this.deviceRepository.save(device);
  }

  findAll() {
    return this.deviceRepository.find({
      relations: ['sensor'],
    });
  }

  findOne(id: number) {
    return this.deviceRepository.findOneBy({ id });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.deviceRepository.update(id, updateDeviceDto);
  }

  remove(id: number) {
    return this.deviceRepository.delete(id);
  }
}
