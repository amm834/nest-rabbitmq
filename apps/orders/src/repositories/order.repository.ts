import { AbstractDatabaseRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Order } from '../schemas/order.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class OrderRepository extends AbstractDatabaseRepository<Order> {
  logger = new Logger(OrderRepository.name);
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
