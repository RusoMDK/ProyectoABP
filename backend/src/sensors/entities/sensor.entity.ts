import { Data_Sensor } from 'src/data-sensor/entities/data-sensor.entity';
import { Device } from 'src/device/entities/device.entity';
import { Escenary } from 'src/escenary/entities/escenary.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @ManyToOne(() => Escenary, (escenary) => escenary.sensors)
  escenary: Escenary;

  @OneToMany(
    () => Data_Sensor,
    (data_Sensor: Data_Sensor) => data_Sensor.sensor,
  )
  data: Data_Sensor[];

  @ManyToOne(() => Device, (device) => device.sensor)
  device: Device;
}
