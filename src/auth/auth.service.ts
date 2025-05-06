import { User, UserDocument } from 'src/schema/user.schema';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  generateJwt(payload: { sub: string; email: string }) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: User) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }
    const userExists = await this.findUserByEmail(user.email);
    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists._id.toString(),
      email: userExists.email,
    });
  }

  async registerUser(user: CreateUserDto) {
    try {
      console.log('User', user);
      const newUser = await this.userModel.create(user);
      return this.generateJwt({
        sub: newUser._id.toString(),
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string) {
    console.log('Email:', email);
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return user;
  }
}
