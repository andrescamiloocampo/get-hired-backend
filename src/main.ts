import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  app.use(
    session({
      secret: '5Qk+HXSTFNty+D1mtX4dzKNJvadGtu/1qZRKqa7iFUk',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 600000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
