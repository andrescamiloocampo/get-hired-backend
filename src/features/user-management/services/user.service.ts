import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getEnrollmentStatus(id: string): Promise<boolean | null> {
    const user = await this.userModel.findOne({ _id: id });
    return user ? user.enrolled : null;
  }
}
