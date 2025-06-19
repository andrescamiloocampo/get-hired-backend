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
import { ValidateTokenDto } from './dto/ValidateTokenDto';
import { UserPayload, ValidationResponse } from './models/UserPayload.model';

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
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return user;
  }

  async validateToken(
    tokenRequest: ValidateTokenDto,
  ): Promise<ValidationResponse> {
    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(
        tokenRequest.token,
      );
      return {
        status: !!(payload && payload.sub && payload.email),
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('Invalid token:', errorMessage);
      return {
        status: false,
      };
    }
  }
}
