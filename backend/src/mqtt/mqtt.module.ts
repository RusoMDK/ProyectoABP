import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { DataSensorModule } from 'src/data-sensor/data-sensor.module';

@Module({
  imports: [DataSensorModule],
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MQTTModule {}
