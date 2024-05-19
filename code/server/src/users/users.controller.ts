import {Body, Controller, Get, Post, Req, UseGuards, UsePipes} from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDto } from './dto/login.dto';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import {JWTUser, UsersGuard} from '@/src/users/users.guard';
import { SimplePipe } from '@/pipes';
import { traineeRegisterDto } from '@/src/users/dto/trainee.register.dto';
import { trainerRegisterDto } from '@/src/users/dto/trainer.register.dto';
import { Role } from '@/enum/role.enum';

@Controller('users')
@UsePipes(SimplePipe)
@ApiResponse({
  status: 500,
  description: 'Internal server error. Please try again later.',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Returns authorization token' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid email or password.' })
  async login(@Body() data: loginDto) {
    return await this.usersService.login(data);
  }

  @Post('register/trainer')
  @ApiResponse({ status: 200, description: 'Returns authorization token' })
  @ApiResponse({ status: 400, description: 'Validation failed: user already exists' })
  async TrainerRegister(@Body() data: trainerRegisterDto) {
    return await this.usersService.register(data, Role.TRAINER);
  }

  @Post('register/trainee')
  @ApiResponse({ status: 200, description: 'Returns authorization token' })
  @ApiResponse({ status: 400, description: 'Validation failed: user already exists' })
  async TraineeRegister(@Body() data: traineeRegisterDto) {
    return await this.usersService.register(data, Role.TRAINEE);
  }

  @Get('check-token')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Token is valid and can be used to perform other operations. Returns user info.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token is either missing, invalid, or expired.',
  })
  @UseGuards(UsersGuard)
  async checkToken(@Req() req: Request) {
    const user: JWTUser = req['user'];
    return await this.usersService.getUser(user.email);
  }
}
