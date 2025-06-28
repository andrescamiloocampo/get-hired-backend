import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserSchema,
  User,
} from './features/user-management/schema/user.schema';
import { ThrottlerModule } from '@nestjs/throttler';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './features/user-management/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 3000,
        },
      ],
    }),
    PassportModule.register({ session: true }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
