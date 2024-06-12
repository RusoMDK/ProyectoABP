import { Module } from '@nestjs/common';
import { DataSensorService } from './data-sensor.service';
import { DataSensorController } from './data-sensor.controller';
import { Data_Sensor } from './entities/data-sensor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Data_Sensor])],
  controllers: [DataSensorController],
  providers: [DataSensorService],
  exports: [DataSensorService],
})
export class DataSensorModule {}
