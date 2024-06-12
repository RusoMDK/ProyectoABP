import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const mqttClient = ClientProxyFactory.create({
  transport: Transport.MQTT,
  options: {
    url: 'mqtt://172.20.10.11', // La URL de tu servidor MQTT
  },
});
