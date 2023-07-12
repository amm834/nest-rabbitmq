import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from './dto';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getOrders() {
    return this.appService.getOrders();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    return this.appService.createOrder(
      createOrderDto,
      req?.cookies?.Authentication,
    );
  }
}
