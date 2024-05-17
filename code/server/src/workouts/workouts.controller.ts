import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { UsersGuard } from '@/src/users/users.guard';
import { SimplePipe } from '@/pipes';
import { WorkoutsService } from '@/src/workouts/workouts.service';
import { CreateWorkoutDto } from '@/src/workouts/dto/create.dto';
import { searchWorkoutDto } from '@/src/workouts/dto/search.dto';
import { logWorkoutDto } from '@/src/workouts/dto/log.dto';

@Controller('workouts')
@UsePipes(SimplePipe)
@ApiResponse({
  status: 500,
  description: 'Internal server error. Please try again later.',
})
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer <token>',
  required: true,
})
@UseGuards(UsersGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Returns ID of created workout.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in or not a trainer.' })
  async create(@Body() data: CreateWorkoutDto, @Req() req: Request) {
    const user = req['user'];
    return await this.workoutsService.create(data, user);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns workouts' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in.' })
  async search(@Query() query: searchWorkoutDto) {
    return await this.workoutsService.search(query);
  }

  @Post('log')
  @ApiResponse({ status: 200, description: 'Successfully logs a workout' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in or not a user.' })
  async logWorkout(@Body() data: logWorkoutDto, @Req() req: Request) {
    const user = req['user'];
    return await this.workoutsService.logWorkout(data, user);
  }


  @Get('log')
    @ApiResponse({ status: 200, description: 'Returns workouts performed by user' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in.' })
    async getLogs(@Req() req: Request) {
      const user = req['user'];
      return await this.workoutsService.getLogs(user);
    }


}
