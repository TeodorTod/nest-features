import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  type: process.env.DB_TYPE || 'postgres',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'nestjs',
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
  autoloadEntities: process.env.DB_AUTOLOAD === 'true' ? true : false,
})); 
