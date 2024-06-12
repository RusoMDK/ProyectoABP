import { PartialType } from '@nestjs/mapped-types';
import { CreateDataSensorDto } from './create-data-sensor.dto';

export class UpdateDataSensorDto extends PartialType(CreateDataSensorDto) {}
