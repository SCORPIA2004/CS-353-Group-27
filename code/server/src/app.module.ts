import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import ConfiguredThrottler from '@/config/throttler.config';
import {UsersModule} from "./users/users.module";
import { WorkoutsModule } from '@/src/workouts/workouts.module';
import { GoalsModule } from './goals/goals.module';

@Module({
  imports: [ConfiguredThrottler, UsersModule, WorkoutsModule, GoalsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
