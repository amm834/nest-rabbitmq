import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrderRepository } from './repositories';
import { BILLING_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, authToken: string) {
    const session = await this.orderRepository.startTransaction();
    try {
      const order = await this.orderRepository.create(createOrderDto, {
        session,
      });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          createOrderDto,
          Authentication: authToken,
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  getOrders() {
    return this.orderRepository.find({});
  }
}
