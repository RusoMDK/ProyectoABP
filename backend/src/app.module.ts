import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';
import { EscenaryModule } from './escenary/escenary.module';
import { AuthModule } from './auth/auth.module';
import { SensorsModule } from './sensors/sensors.module';
import { DataSensorModule } from './data-sensor/data-sensor.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Device } from './device/entities/device.entity';
import { Escenary } from './escenary/entities/escenary.entity';
import { Sensor } from './sensors/entities/sensor.entity';
import { Data_Sensor } from './data-sensor/entities/data-sensor.entity';
import { Role } from './roles/entities/role.entity';
import { MQTTModule } from './mqtt/mqtt.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Device, Escenary, Sensor, Data_Sensor, Role],
        synchronize: true,
      }),
    }),
    UserModule,
    DeviceModule,
    EscenaryModule,
    AuthModule,
    SensorsModule,
    DataSensorModule,
    RolesModule,
    MQTTModule,
    JwtModule.register({
      global: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
