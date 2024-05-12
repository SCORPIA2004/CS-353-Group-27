import { Module } from '@nestjs/common';
import { WorkoutsService } from '@/src/workouts/workouts.service';
import { WorkoutsController } from '@/src/workouts/workouts.controller';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
})
export class WorkoutsModule {}
