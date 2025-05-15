import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type Role = 'admin' | 'user' | 'premium';

@Schema({ toJSON: { virtuals: true } })
export class User {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  givenName: string;

  @Prop({ required: true })
  provider: string;

  @Prop({ required: true })
  providerId: string;

  @Prop({ required: true })
  picture: string;

  @Prop({ required: false })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id;
});
