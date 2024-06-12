import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Escenary } from 'src/escenary/entities/escenary.entity';
import { Sensor } from 'src/sensors/entities/sensor.entity';

export class CreateDataSensorDto {
  @IsNumber()
  data: number;

  @IsString()
  type: string;

  @IsOptional()
  sensor?: Sensor;

  @IsOptional()
  escenary?: Escenary;
}
