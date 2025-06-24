import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [JwtService, UserService],
  controllers: [UserController],
})
export class UsersModule {}
