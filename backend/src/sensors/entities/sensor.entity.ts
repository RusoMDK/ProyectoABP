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

  @ManyToOne(() => Escenary, (escenary) => escenary.sensors,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  escenary: Escenary;

  @OneToMany(
    () => Data_Sensor,
    (data_Sensor: Data_Sensor) => data_Sensor.sensor,{
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  data: Data_Sensor[];

  @ManyToOne(() => Device, (device) => device.sensor,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  device: Device;
}
