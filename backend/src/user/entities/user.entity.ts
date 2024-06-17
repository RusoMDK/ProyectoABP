import { Device } from 'src/device/entities/device.entity';
import { Escenary } from 'src/escenary/entities/escenary.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: Role;

  @OneToMany(() => Device, (device) => device.user,{
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  device: Device[];

  @OneToMany(() => Escenary, (escenary) => escenary.user,{
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  scenary: Escenary[];
}
