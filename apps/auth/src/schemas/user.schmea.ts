import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDatabaseSchema } from '@app/common';

@Schema({ versionKey: false, collection: 'users' })
export class User extends AbstractDatabaseSchema {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
