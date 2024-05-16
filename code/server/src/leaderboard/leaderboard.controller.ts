import { Controller, Get, Req, UseGuards, UsePipes } from '@nestjs/common';
import { SimplePipe } from '@/pipes';
import { ApiResponse } from '@nestjs/swagger';
import { JWTUser, UsersGuard } from '@/src/users/users.guard';
import { LeaderboardService } from '@/src/leaderboard/leaderboard.service';

@Controller('leaderboard')
@UsePipes(SimplePipe)
@ApiResponse({
  status: 500,
  description: 'Internal server error. Please try again later.',
})
@UseGuards(UsersGuard)
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Returns Leaderboard' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Not logged in.' })
  async getLeaderboard() {
    return this.leaderboardService.getLeaderboard();
  }
}
