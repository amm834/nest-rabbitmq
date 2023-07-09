import { Prop } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

export abstract class AbstractDatabaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;
}
