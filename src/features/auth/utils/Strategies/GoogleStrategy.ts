import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../services/auth.service';
import { User } from '@/features/user-management/schema/user.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');

    if (!clientID || !clientSecret || !callbackURL)
      throw new Error('Missing Google OAuth environment variables');

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user: User = {
      _id: uuid(),
      provider: 'google',
      providerId: id,
      email: emails?.[0]?.value ?? '',
      name: `${name?.givenName} ${name?.familyName}`,
      givenName: `${name?.givenName}`,
      picture: photos?.[0].value ?? '',
      role: 'user',
      enrolled: false,
    };

    done(null, user);
  }
}
