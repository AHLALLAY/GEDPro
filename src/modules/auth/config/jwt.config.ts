import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfigFactory = (configService: ConfigService): JwtModuleOptions => {
  const secret = configService.get<string>('JWT_SECRET');
  const expiration = configService.get<string>('JWT_EXPIRATION');

  if (!secret) {
    throw new Error('JWT_SECRET is required in .env file');
  }
  if (!expiration) {
    throw new Error('JWT_EXPIRATION is required in .env file');
  }

  return {
    secret,
    signOptions: {
      expiresIn: expiration
    }
  } as JwtModuleOptions;
};