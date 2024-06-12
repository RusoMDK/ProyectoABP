import { Data_Sensor } from 'src/data-sensor/entities/data-sensor.entity';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Escenary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Sensor, (sensor) => sensor.escenary)
  sensors: Sensor[];

  @OneToMany(() => Data_Sensor, (datas) => datas.escenary)
  datas: Sensor[];

  @ManyToOne(() => User, (user) => user.scenary)
  user: User;
}
