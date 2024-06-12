import { Module } from '@nestjs/common';
import { SensorService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { Sensor } from './entities/sensor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  controllers: [SensorsController],
  providers: [SensorService],
})
export class SensorsModule {}
