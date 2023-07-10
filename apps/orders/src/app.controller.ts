import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from './dto';

@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getOrders() {
    return this.appService.getOrders();
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return createOrderDto;
    // return this.appService.createOrder(createOrderDto);
  }
}
