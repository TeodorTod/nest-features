import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secretKey: process.env.SECRET_KEY || 'some-secret-key',
}));
