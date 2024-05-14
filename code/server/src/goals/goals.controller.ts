import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { SimplePipe } from '@/pipes';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { GoalsService } from '@/src/goals/goals.service';
import { CreateWorkoutDto } from '@/src/workouts/dto/create.dto';
import { JWTUser, UsersGuard } from '@/src/users/users.guard';
import { CreateGoalDto } from '@/src/goals/dto/create.dto';
import { UpdateGoalDto } from '@/src/goals/dto/update.dto';
import { searchWorkoutDto } from '@/src/workouts/dto/search.dto';
import { GetSuggestionDto } from '@/src/goals/dto/get.suggestion.dto';

@Controller('goals')
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
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Returns ID of created goal.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in or not a user.' })
  async create(@Body() data: CreateGoalDto, @Req() req: Request) {
    const user : JWTUser= req['user'];
    return await this.goalsService.create(data, user);
  }


  @Get()
  @ApiResponse({ status: 200, description: 'Returns all goals of user.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in or not a user.' })
  async getAll(@Req() req: Request) {
    const user: JWTUser = req['user'];
    return await this.goalsService.getAll(user);
  }

  @Post('update')
  @ApiResponse({ status: 200, description: 'Returns ID of updated goal.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in or not a user.' })
  async update(@Body() data: UpdateGoalDto, @Req() req: Request) {
    const user : JWTUser= req['user'];
    return await this.goalsService.update(data, user);
  }

  @Get('suggestion')
  @ApiResponse({ status: 200, description: 'Returns suggestions.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in or not a user.' })
  async getSuggestion(@Query() query: GetSuggestionDto, @Req() req: Request) {
    const user : JWTUser= req['user'];
    return await this.goalsService.getSuggestion(query, user);
  }

}
