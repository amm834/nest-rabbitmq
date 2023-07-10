import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrderRepository } from './repositories';
import { BILLING_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  createOrder(createOrderDto: CreateOrderDto) {
    this.billingClient.emit('order_created', createOrderDto);
    return this.orderRepository.create(createOrderDto);
  }

  getOrders() {
    return this.orderRepository.find({});
  }
}
