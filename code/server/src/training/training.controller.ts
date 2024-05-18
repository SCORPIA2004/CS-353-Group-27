import { searchTrainersDto } from '@/src/training/dto/search.dto';
import { SimplePipe } from '@/pipes';
import { ApiResponse } from '@nestjs/swagger';
import { JWTUser, UsersGuard } from '@/src/users/users.guard';
import { TrainingService } from '@/src/training/training.service';
import { ScheduleConsultationDto } from '@/src/training/dto/schedule.dto';
import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ReviewProgressDto } from '@/src/training/dto/review.progress.dto';

@Controller('training')
@UsePipes(SimplePipe)
@ApiResponse({
  status: 500,
  description: 'Internal server error. Please try again later.',
})
@UseGuards(UsersGuard)
export class TrainingController {

  constructor(private readonly trainingService: TrainingService) {
  }


  @Get()
  @ApiResponse({ status: 200, description: 'Returns Trainers' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in.' })
  async getTrainers(@Query() query: searchTrainersDto) {
    return this.trainingService.search(query);
  }


  @Post('consultation')
  @ApiResponse({ status: 200, description: 'Returns Consultation Id' })
  @ApiResponse({ status: 400, description: 'Trainer not available at specified time.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in or not a trainee.' })
  @ApiResponse({ status: 404, description: 'Trainer not found.' })
  async scheduleConsultation(@Body() data: ScheduleConsultationDto, @Req() req: Request) {
    const user: JWTUser = req['user'];
    return this.trainingService.scheduleConsultation(data, user);
  }

  @Get('consultation')
  @ApiResponse({ status: 200, description: 'Returns Consultations' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in.' })
  async getConsultations(@Req() req: Request) {
    const user: JWTUser = req['user'];
    return this.trainingService.getConsultations(user);
  }

  @Post('review-trainee-progess')
  @ApiResponse({ status: 200, description: 'Returns Review' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in or not a trainer.' })
  async reviewProgress(@Body() data: ReviewProgressDto, @Req() req: Request) {
    const user: JWTUser = req['user'];
    return this.trainingService.reviewProgress(data, user);
  }


  @Get('trainees')
  @ApiResponse({ status: 200, description: 'Returns Trainees' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in or not a trainer.' })
  async getTrainees(@Req() req: Request) {
    const user: JWTUser = req['user'];
    return this.trainingService.getTrainees(user);
  }

}
