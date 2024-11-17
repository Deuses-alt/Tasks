import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from 'database/db.config';

@Module({
  imports: [TypeOrmModule.forRoot(getOrmConfig()), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
