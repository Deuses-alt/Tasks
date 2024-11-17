import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export function getOrmConfig(): TypeOrmModuleOptions {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'Test3DB',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: isProd,
  };
}
