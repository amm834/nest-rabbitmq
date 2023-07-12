import { Injectable, Logger } from '@nestjs/common';
import { AbstractDatabaseRepository } from '@app/common';
import { User } from './schemas';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractDatabaseRepository<User> {
  protected readonly logger = new Logger();

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
