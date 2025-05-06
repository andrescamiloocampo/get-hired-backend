import { Controller, Req, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard, JwtAuthGuard } from './utils/Guards';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);
    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    // return res.redirect('http://localhost:3000/api');
    return res.json({ token });
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  testRoute() {
    return 'Hello world!';
  }
}
