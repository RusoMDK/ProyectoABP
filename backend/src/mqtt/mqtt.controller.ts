import { Controller, Get } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Get('publish')
  async publishMessage() {
    const topic = 'outTopic';
    const message = { data: 'Hello MQTT' };
    await this.mqttService.publish(topic, message);
    return 'Message published';
  }

  @Get('subscribe')
  async subscribeToTopic() {
    const topic = 'outTopic';
    console.log(topic);
    this.mqttService.subscribe(topic, (message) => {
      console.log('Received message:', message);
    });
    return 'Subscribed to topic';
  }
}
