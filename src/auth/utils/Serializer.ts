import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/schema/user.schema';

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
