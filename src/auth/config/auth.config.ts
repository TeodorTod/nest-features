import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_TOKEN_SECRET || 'some-secret-key',
  expirationTime: parseInt(process.env.JWT_TOKEN_EXPIRATION_TIME || '3600'),
  refreshTokenExpirationTime: parseInt(
    process.env.REFRESH_TOKEN_EXPIRES_IN || '86400', 10,
  ),
  audience: process.env.JWT_TOKEN_AUDIENCE || 'localhost:3000',
  issuer: process.env.JWT_TOKEN_ISSUER || 'localhost:3000',
}));
