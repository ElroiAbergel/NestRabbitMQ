// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create the main Nest application
  const app = await NestFactory.create(AppModule);

  // Connect a microservice transport (RabbitMQ)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ default URL
      queue: 'my_queue', // Queue name
      queueOptions: {
        durable: false,
      },
    },
  });

  // Start the microservice
  await app.startAllMicroservices();

  // (Optional) Also run an HTTP server on port 3001
  // so you can still access typical Nest endpoints if needed
  await app.listen(3001);
  console.log('Microservice is listening on RabbitMQ and on port 3001');
}
bootstrap();
