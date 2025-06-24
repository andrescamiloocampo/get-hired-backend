import { ValidationResponse } from '../types/UserPayload.model';
import { ValidateTokenDto } from '../models/dto';
import {
  Controller,
  Req,
  Get,
  UseGuards,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { GoogleOauthGuard, JwtAuthGuard } from '../utils';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);
    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.redirect(`http://localhost:4200/login?token=${token}`);
  }

  @Post('validate')
  async validateToken(
    @Body() body: ValidateTokenDto,
  ): Promise<ValidationResponse> {
    return await this.authService.validateToken(body);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  testRoute() {
    return 'Hello world!';
  }
}
