import { UserService } from '../services/user.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/features/auth/utils';
import { User } from '../schema/user.schema';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getById:id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return await this.userService.findUserById(id);
  }

  @Get('getUser')
  async getUserByEmail(@Query('email') email: string): Promise<User | null> {
    try {
      const user = await this.userService.findUserByEmail(email);
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  @Get('getEnrollment')
  async getUserEnrollment(
    @Query('id') id: string,
  ): Promise<{ message: string; status: boolean | null }> {
    const status = await this.userService.getEnrollmentStatus(id);
    return {
      message: 'User status',
      status,
    };
  }
}
