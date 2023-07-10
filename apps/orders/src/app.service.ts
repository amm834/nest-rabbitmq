import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrderRepository } from './repositories';

@Injectable()
export class AppService {
  constructor(private readonly orderRepository: OrderRepository) {}

  createOrder(createOrderDto: CreateOrderDto) {
    return this.orderRepository.create(createOrderDto);
  }

  getOrders() {
    return this.orderRepository.find({});
  }
}
