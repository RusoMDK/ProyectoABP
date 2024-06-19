import { Escenary } from 'src/escenary/entities/escenary.entity';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Data_Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  data: number;

  @Column()
  type: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Sensor, (sensor) => sensor.data, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sensor: Sensor;

  @ManyToOne(() => Escenary, (escenary) => escenary.datas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  escenary: Escenary;
}
