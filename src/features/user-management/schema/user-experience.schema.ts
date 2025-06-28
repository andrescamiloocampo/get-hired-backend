import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { JobModel } from '../types';

class ContactData {
  @Prop()
  phone: string;

  @Prop()
  location: string;
}

class SkillModel {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  level: string;

  @Prop()
  jobs: JobModel[];
}

@Schema({ toJSON: { virtuals: true } })
export class UserExperience {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: ContactData, required: false })
  contactData: ContactData;

  @Prop({ required: false })
  summary: string;

  @Prop({ type: SkillModel, required: false })
  skills: SkillModel;

  @Prop({ required: false })
  jobs: JobModel;
}

export const UserExperienceSchema =
  SchemaFactory.createForClass(UserExperience);

UserExperienceSchema.virtual('id').get(function () {
  return this._id;
});
