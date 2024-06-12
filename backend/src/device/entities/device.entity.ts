import { Sensor } from 'src/sensors/entities/sensor.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.device)
  user: number;

  @OneToMany(() => Sensor, (sensor) => sensor.device)
  sensor: Sensor[];
}
