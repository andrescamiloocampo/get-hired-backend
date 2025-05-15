import { UserService } from './user.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/utils/Guards';
import { User } from 'src/schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getById:id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<User | null> {
    return await this.userService.findUserById(id);
  }

  @Get('getUser')
  @UseGuards(JwtAuthGuard)
  async getUserByEmail(@Query('email') email: string): Promise<User | null> {
    try {
      const user = await this.userService.findUserByEmail(email);
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }
}
