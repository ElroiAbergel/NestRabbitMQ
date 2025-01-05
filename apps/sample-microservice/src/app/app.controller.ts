// src/app.controller.ts

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('hello')
  handleHello(@Payload() data: any): string {
    console.log(`Received data from Gateway: ${JSON.stringify(data)}`);
    // Process the data and return a response
    return `Microservice says: Hello back! Your message was: ${data.text}`;
  }
}
