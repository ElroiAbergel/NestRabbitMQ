// src/app.controller.ts

import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('MICROSERVICE_CLIENT') private readonly client: ClientProxy
  ) {}

  @Get()
  getHello(): Observable<string> {
    // Send a pattern "hello" to the microservice
    return this.client.send<string>('hello', { text: 'Hello from Gateway!' });
  }
}
