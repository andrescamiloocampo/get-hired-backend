import { AuthService } from './../../services/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@/features/user-management/schema/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: (err: any, id?: any) => void) {
    console.log('Serialize');
    done(null, user);
  }

  async deserializeUser(
    payload: User,
    done: (err: any, user?: User | null) => void,
  ) {
    const user = await this.authService.findUserByEmail(payload.email);
    console.log('Deserialize:', user);
    return user ? done(null, user) : done(null, null);
  }
}
