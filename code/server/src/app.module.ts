import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import ConfiguredThrottler from '@/config/throttler.config';
import {UsersModule} from "./users/users.module";

@Module({
  imports: [ConfiguredThrottler, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
