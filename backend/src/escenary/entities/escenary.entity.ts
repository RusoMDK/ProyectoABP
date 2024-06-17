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

  @OneToMany(() => Sensor, (sensor) => sensor.escenary,{
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sensors: Sensor[];

  @OneToMany(() => Data_Sensor, (datas) => datas.escenary,{
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  datas: Sensor[];

  @ManyToOne(() => User, (user) => user.scenary,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
