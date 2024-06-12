import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { DataSensorService } from 'src/data-sensor/data-sensor.service';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;
  constructor(private readonly dataService: DataSensorService) {}

  onModuleInit() {
    this.client = mqtt.connect('mqtt://172.20.10.11');
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });
  }

  onModuleDestroy() {
    this.client.end();
  }

  publish(topic: string, message: any) {
    this.client.publish(topic, JSON.stringify(message));
  }

  subscribe(topic: string, callback: (message: any) => void) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error('Subscription error:', err);
        return;
      }

      this.client.on('message', (receivedTopic, payload) => {
        if (receivedTopic === topic) {
          callback(JSON.parse(payload.toString()));
          const parses = JSON.parse(payload.toString());
          for (const key in parses) {
            if (parses.hasOwnProperty(key)) {
              this.dataService.create({
                type: key,
                data: parses[key],
              });
            }
            callback(parses);
          }
        }
      });
    });
  }
}
